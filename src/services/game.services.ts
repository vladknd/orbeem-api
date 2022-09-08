import { dischargeNFT, getNFTCharge} from "./nft.services";
import { findUser, updateBalance } from "./user.services";
import axios from 'axios'
import { User } from "@prisma/client";
import { IAward } from "./game.interfaces";
import { DotaNFT} from "./nft.interfaces";


class Game {
    private KILL_FACTOR = 1;
    private DEATH_FACTOR = 1;
    private ASSIST_FACTOR = 1;

    private readonly nftID: string;
    private readonly publicAddress: string;

    private user: User | null = null;
    private nft: DotaNFT | null = null;

    
    private subgraphURI: string =  "https://api.thegraph.com/subgraphs/name/vladknd/orbeem"

    constructor(_nftID: string, _publicAddress: string) {
        this.nftID = _nftID
        this.publicAddress = _publicAddress
    }
    public async setGame(){
        await this.setUser()
        await this.setNFT()
    }
    private async setUser() {
        const _user = await findUser(this.publicAddress)
        this.user = _user
        console.log("THIS USER", this.user);
        
    }
    private async setNFT() {
        this.nft = await this.fetchNFT()
        console.log("THIS NFT", this.nft);
    }

    public async claimTokens(): Promise<IAward> {
            try {
                const verified = await this.checkOwnership()
                console.log("VER", verified)
                
                const charged = await this.checkCharged()
                console.log("CHARGED", charged)

                const matchResults = await this.calculateAwardRune()
                console.log("MATCH RESULTS", matchResults);
                    
                return matchResults
            } catch (error) {
                throw error
            }
     
    }

    private async fetchNFT(): Promise<DotaNFT> {
        try {
            console.log("NFT ID", this.nftID);
            
            const res = await axios({
                method: "post",
                url: this.subgraphURI,
                data: JSON.stringify({
                    query:`
                        query Nfts($nftID: String){
                            nfts(where: {id: $nftID}) {
                                id
                                owner
                                __typename
                                ...on Aegis {
                                    basePower
                                    baseDurability
                                    baseIntelligence
                                    power 
                                    durability
                                    intelligence
                                }
                            }
                        }
                    `,
                    variables: {
                        "nftID": this.nftID
                    }
                })
            })
            
            
            const nftData = res.data
            console.log("NFTS", nftData.data.nfts[0]);
            return nftData.data.nfts[0]
        } catch (error) {
            throw error
        }
    }

    public async mintTokens(): Promise<IAward> {
        if(this.nft) {
            try {
                const claimed = await this.claimTokens()
                await this.setBalance(claimed.award)
                await dischargeNFT(this.nft.id)
                return claimed
            } catch (error) {
                throw error
            }
            
        } else {
            throw new Error("NO NFT")
        }

    }
    
    private async calculateAwardRune(): Promise<IAward>{
        if(this.nft && this.user && this.nft.__typename === "Aegis"){
            const id32 = Number(this.user.steamId.substr(-16,16)) - 6561197960265728
            console.log("ID32", id32);
            
            const res = await axios.get(`https://api.opendota.com/api/players/${id32}/recentMatches`)
            console.log("MATCH_RES", res);
            
            const data = res.data
            if(data.length === 0) throw new ErrorNoData
            console.log("MATCG DATA", data);

            const {kills, deaths, assists} = data[0]
            const points = Math.round(kills + this.nft.power - deaths + this.nft.durability + assists + this.nft.intelligence)
            let award
            if(points < 20) {
                award = 1
            }
            else if(points >= 20 && points < 30 ) {
                award = 2
            } else {
                award = 3
            }
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

    private async setBalance(_balance: number){
        if(this.user){
            const newBalance = await updateBalance(this.user.publicAddress, _balance+this.user.balance)
            console.log("N", newBalance);

            return newBalance
        }
        return null
    } 

    private checkOwnership(): boolean {
        console.log(this.user, this.nft);
        
        if(this.user && this.nft){
            console.log("PA", this.user.publicAddress);
            console.log("OWNER", this.nft.owner);
     
            if(this.user.publicAddress.toLowerCase() === this.nft.owner) {
                return true
            } else {
                throw new ErrorVerification
            }
        } else {
            throw new Error("NO USER / NO NFT")
        }

        
    }   

    private async checkCharged(): Promise<boolean> {
        if(this.nft){
            const charge = await getNFTCharge(this.nft.id)
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

//ERRORS________________________________________________
export class ErrorDischarged extends Error {}
export class ErrorVerification extends Error {}
export class ErrorNoData extends Error {}
//______________________________________________________
export default Game

// console.log(Number("76561198977513930".substr(-16,16)) - 6561197960265728);
