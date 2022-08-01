import { dischargeNFT, getNFT, getNFTCharge, INFT, INFTData } from "./nft.services";
import { findSteamID, findUser, getBalance, updateBalance } from "./user.services";
import axios from 'axios'
import { prisma, User } from "@prisma/client";

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

    public async claimTokens() {
        if(this.nft && this.nftData){
            const verified = await this.checkOwnership()
            console.log("VER", verified)
            
            const charged = await this.checkCharged()
            console.log("CHARGED", charged)
            
            if(verified && charged){
                if(this.user){
                    const matchResults = await this.calculateAward(this.nftData)
                    console.log("MATCH RESULTS", matchResults);
                    
                    return matchResults
                }
            }   
        }
        return null
    }

    public async mintTokens() {
        const claimed = await this.claimTokens()
        
        if(claimed && this.nft) {
            await this.setBalance(claimed.award)
            await dischargeNFT(this.nft.tokenID)
            return claimed
        }
        return null
    }

    private async calculateAward(_nftData: INFTData){
        if(this.user){
            const res = await axios.get(`https://api.opendota.com/api/players/${this.user.steamId}/recentMatches`)
            const data = res.data

            const {kills, deaths, assists} = data[0]
            const award = Math.round(this.KILL_FACTOR*kills*_nftData.power - deaths/(this.DEATH_FACTOR*_nftData.durability) + this.ASSIST_FACTOR*assists*_nftData.intelligence)
            console.log("CALCULATED AWARD", award);
            
            return {
                award,
                kills,
                deaths,
                assists
            }
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

    private checkOwnership() {
        if(this.user && this.nftData){
            console.log("PA", this.user.publicAddress);
            console.log("OWNER", this.nftData.owner);
    
            if(this.user.publicAddress.toLowerCase() === this.nftData.owner.toLowerCase()) return true
        }
        
    }   

    private checkCharged(): boolean | null {
        console.log("CHARGED",this.nft?.charged);
        if(this.nft){
            return this.nft.charged 
        }
        return null
    }
}

export default Game