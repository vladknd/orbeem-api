"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveClaimTokensQuery = exports.typedefClaimTokensQuery = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const game_services_1 = __importStar(require("../../services/game.services"));
exports.typedefClaimTokensQuery = (0, apollo_server_express_1.gql) `
    # type MatchResults {
    #     award: Int!
    #     kills: Int!
    #     deaths: Int!
    #     assists: Int!
    # }
    extend type Query {
        claimTokens (
            publicAddress: String!,
            nftID: String!
        ): Claim
    }
`;
exports.resolveClaimTokensQuery = {
    claimTokens: (source, { publicAddress, nftID }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("HEEREEE 1", publicAddress, nftID);
        const game = new game_services_1.default(nftID, publicAddress);
        yield game.setGame();
        try {
            console.log("HEEREEE");
            const claimed = yield game.claimTokens();
            console.log("MINTED", claimed);
            return { success: claimed };
        }
        catch (error) {
            if (error instanceof game_services_1.ErrorVerification)
                return { error: "ErrorVerification" };
            else if (error instanceof game_services_1.ErrorDischarged)
                return { error: "ErrorDischarged" };
            else if (error instanceof game_services_1.ErrorNoData)
                return { error: "ErrorNoData" };
            throw new Error("CLAIM-TOKENS-MUTATION: UNKNOWN ERROR");
        }
    })
};
