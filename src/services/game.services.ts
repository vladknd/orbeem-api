import { dischargeNFT, getNFT, getNFTCharge, INFT, INFTData } from "./nft.services";
import { findSteamID, findUser, getBalance, updateBalance } from "./user.services";
import axios from 'axios'
import { prisma, User } from "@prisma/client";
import { IAward } from "./game.interfaces";

class Game {
    private KILL_FACTOR = 1;
    private DEATH_FACTOR = 1;
    private ASSIST_FACTOR = 1;

    private tokenID: number;
    private publicAddress: string;

    private user: User | null = null;
    private nft: INFT | null = null;
    private nftData: INFTData | null = null;
    
    private subgraphURI: string =  "https://api.thegraph.com/subgraphs/name/vladknd/orbeem"

    constructor(_tokenID: number, _publicAddress: string) {
        this.tokenID = _tokenID
        this.publicAddress = _publicAddress
    }
    public async setGame(){
        await this.setUser(this.publicAddress)
        await this.setNFT(this.tokenID)
        await this.setNFTData()
    }
    private async setUser(_publicAddress: string) {
        const _user = await findUser(_publicAddress)
        this.user = _user
        console.log("THIS USER", this.user);
        
    }
    private async setNFT(_tokenID: number) {
        const _nft = await getNFT(_tokenID)
        this.nft = _nft
        console.log("THIS NFT", this.nft);
    }
    private async setNFTData(){
        const _nftData = await this.getNFTData()
        this.nftData = _nftData
        console.log("THIS NFT DATA", this.nftData);
    }

    public async claimTokens(): Promise<IAward> {
        if(this.nft && this.nftData){
            try {
                const verified = await this.checkOwnership()
                console.log("VER", verified)
                
                const charged = await this.checkCharged()
                console.log("CHARGED", charged)

                const matchResults = await this.calculateAward(this.nftData)
                console.log("MATCH RESULTS", matchResults);
                    
                return matchResults
            } catch (error) {
                throw error
            }
            
            // if(verified && charged){
            //     if(this.user){
            //         const matchResults = await this.calculateAward(this.nftData)
            //         console.log("MATCH RESULTS", matchResults);
                    
            //         return matchResults
            //     }
            // }   
        } else {
            throw new Error("NO NFT")
        }
        // return null
    }

    public async mintTokens(): Promise<IAward> {
        if(this.nft) {
            try {
                const claimed = await this.claimTokens()
                await this.setBalance(claimed.award)
                await dischargeNFT(this.nft.tokenID)
                return claimed
            } catch (error) {
                throw error
            }
            
        } else {
            throw new Error("NO NFT")
        }

    }

    private async calculateAward(_nftData: INFTData): Promise<IAward>{
        if(this.user){
            const res = await axios.get(`https://api.opendota.com/api/players/${this.user.steamId}/recentMatches`)
            console.log("MATCG RES", res);
            
            const data = res.data
            console.log("MATCG DATA", data);
            if(data.length === 0) throw new ErrorNoData

            const {kills, deaths, assists} = data[0]
            const points = Math.round(kills + _nftData.power - deaths + _nftData.durability + assists + _nftData.intelligence)
            let award
            if(points < 20) award = 0.1
            else if(points >= 20 && points < 30 ) award = 1
            else award = 2
            console.log("CALCULATED AWARD", award);
            
            return {
                award,
                kills,
                deaths,
                assists
            }
        } else {
            throw new Error("NO USER")
        }
    }

    private async getNFTData(): Promise<INFTData | null> {
        if(this.nft){
            const res = await axios({
                method: "post",
                url: this.subgraphURI,
                data: JSON.stringify({
                    query:`
                        {
                            runes(where: {tokenId: ${Number(this.nft.tokenID)}}) {
                                tokenId
                                itemId
                                tokenURI
                                sold
                                owner
                                level
                                basePower
                                baseDurability
                                baseIntelligence
                                power 
                                durability
                                intelligence
                                price 
                            }
                        }
                    `
                })
            })

            const nft = res.data.data.runes[0]
            console.log("AXIOS NFT DATA", nft)

            return nft
        }
        return null
    }

    private async setBalance(_balance: number){
        if(this.user){
            const newBalance = await updateBalance(this.user.publicAddress, _balance+this.user.balance)
            console.log("N", newBalance);

            return newBalance
        }
        return null
    } 

    private checkOwnership(): boolean {
        if(this.user && this.nftData){
            console.log("PA", this.user.publicAddress);
            console.log("OWNER", this.nftData.owner);
    
            if(this.user.publicAddress.toLowerCase() === this.nftData.owner.toLowerCase()) {
                return true
            } else {
                throw new ErrorVerification
            }
        } else {
            throw new Error("NO USER / NO NFT")
        }

        
    }   

    private checkCharged(): boolean {
        console.log("CHARGED",this.nft?.charged);
        if(this.nft){
            const charge = this.nft.charged 
            if(charge) {
                return true
            } else {
                throw new ErrorDischarged
            }
        } else {
            throw new Error("NO NFT")
        }
        
    }
}

export class ErrorDischarged extends Error {}
export class ErrorVerification extends Error {}
export class ErrorNoData extends Error {}

export default Game