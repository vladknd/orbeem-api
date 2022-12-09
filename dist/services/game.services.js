"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorNoData = exports.ErrorVerification = exports.ErrorDischarged = void 0;
const nft_services_1 = require("./nft.services");
const user_services_1 = require("./user.services");
const axios_1 = __importDefault(require("axios"));
class Game {
    constructor(_nftID, _publicAddress) {
        this.KILL_FACTOR = 1;
        this.DEATH_FACTOR = 1;
        this.ASSIST_FACTOR = 1;
        this.user = null;
        this.nft = null;
        this.subgraphURI = "https://api.thegraph.com/subgraphs/name/vladknd/orbeem";
        this.nftID = _nftID;
        this.publicAddress = _publicAddress;
    }
    setGame() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setUser();
            yield this.setNFT();
        });
    }
    setUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const _user = yield (0, user_services_1.findUser)(this.publicAddress);
            this.user = _user;
            console.log("THIS USER", this.user);
        });
    }
    setNFT() {
        return __awaiter(this, void 0, void 0, function* () {
            this.nft = yield this.fetchNFT();
            console.log("THIS NFT", this.nft);
        });
    }
    claimTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verified = yield this.checkOwnership();
                console.log("VER", verified);
                const charged = yield this.checkCharged();
                console.log("CHARGED", charged);
                const matchResults = yield this.calculateAwardRune();
                console.log("MATCH RESULTS", matchResults);
                return matchResults;
            }
            catch (error) {
                throw error;
            }
        });
    }
    fetchNFT() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("NFT ID", this.nftID);
                const res = yield (0, axios_1.default)({
                    method: "post",
                    url: this.subgraphURI,
                    data: JSON.stringify({
                        query: `
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
                });
                const nftData = res.data;
                console.log("NFTS", nftData.data.nfts[0]);
                return nftData.data.nfts[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    mintTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nft) {
                try {
                    const claimed = yield this.claimTokens();
                    yield this.setBalance(claimed.award);
                    yield (0, nft_services_1.dischargeNFT)(this.nft.id);
                    return claimed;
                }
                catch (error) {
                    throw error;
                }
            }
            else {
                throw new Error("NO NFT");
            }
        });
    }
    calculateAwardRune() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nft && this.user && this.nft.__typename === "Aegis") {
                const id32 = Number(this.user.steamId.substr(-16, 16)) - 6561197960265728;
                console.log("ID32", id32);
                const res = yield axios_1.default.get(`https://api.opendota.com/api/players/${id32}/recentMatches`);
                console.log("MATCH_RES", res);
                const data = res.data;
                if (data.length === 0)
                    throw new ErrorNoData;
                console.log("MATCG DATA", data);
                const { kills, deaths, assists } = data[0];
                const points = Math.round(kills + this.nft.power - deaths + this.nft.durability + assists + this.nft.intelligence);
                let award;
                if (points < 20) {
                    award = 1;
                }
                else if (points >= 20 && points < 30) {
                    award = 2;
                }
                else {
                    award = 3;
                }
                console.log("CALCULATED AWARD", award);
                return {
                    award,
                    kills,
                    deaths,
                    assists
                };
            }
            else {
                throw new Error("NO USER");
            }
        });
    }
    setBalance(_balance) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.user) {
                const newBalance = yield (0, user_services_1.updateBalance)(this.user.publicAddress, _balance + this.user.balance);
                console.log("N", newBalance);
                return newBalance;
            }
            return null;
        });
    }
    checkOwnership() {
        console.log(this.user, this.nft);
        if (this.user && this.nft) {
            console.log("PA", this.user.publicAddress);
            console.log("OWNER", this.nft.owner);
            if (this.user.publicAddress.toLowerCase() === this.nft.owner) {
                return true;
            }
            else {
                throw new ErrorVerification;
            }
        }
        else {
            throw new Error("NO USER / NO NFT");
        }
    }
    checkCharged() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nft) {
                const charge = yield (0, nft_services_1.getNFTCharge)(this.nft.id);
                if (charge) {
                    return true;
                }
                else {
                    throw new ErrorDischarged;
                }
            }
            else {
                throw new Error("NO NFT");
            }
        });
    }
}
//ERRORS________________________________________________
class ErrorDischarged extends Error {
}
exports.ErrorDischarged = ErrorDischarged;
class ErrorVerification extends Error {
}
exports.ErrorVerification = ErrorVerification;
class ErrorNoData extends Error {
}
exports.ErrorNoData = ErrorNoData;
//______________________________________________________
exports.default = Game;
// console.log(Number("76561198977513930".substr(-16,16)) - 6561197960265728);
