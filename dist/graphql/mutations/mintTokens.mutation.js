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
exports.resolveMintTokensMutation = exports.typedefMintTokensMutation = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const game_services_1 = __importStar(require("../../services/game.services"));
exports.typedefMintTokensMutation = (0, apollo_server_express_1.gql) `

    extend type Mutation {
        mintTokens (
            publicAddress: String!,
            nftID: String!
        ): Mint
    }
`;
exports.resolveMintTokensMutation = {
    mintTokens: (source, { publicAddress, nftID }) => __awaiter(void 0, void 0, void 0, function* () {
        const game = new game_services_1.default(nftID, publicAddress);
        yield game.setGame();
        try {
            const minted = yield game.mintTokens();
            console.log("MINTED", minted);
            return { success: minted };
        }
        catch (error) {
            if (error instanceof game_services_1.ErrorVerification)
                return { error: "ErrorVerification" };
            else if (error instanceof game_services_1.ErrorDischarged)
                return { error: "ErrorDischarged" };
            throw new Error("MINT-TOKEN_MUTATION: UNKNOWN ERROR");
        }
    })
};
