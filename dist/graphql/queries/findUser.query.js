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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFindUserQuery = exports.typedefFindUserQuery = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const user_services_1 = require("../../services/user.services");
exports.typedefFindUserQuery = (0, apollo_server_express_1.gql) `
    type LoginRequest {
        publicAddress: String!
        nonce: String!
    }

    extend type Query {
        findUser (
            publicAddress: String!,
        ): LoginRequest 
    }
`;
exports.resolveFindUserQuery = {
    findUser: (source, { publicAddress }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, user_services_1.findUser)(publicAddress);
        console.log("API FOUND USER:", user);
        if (user)
            return {
                publicAddress: user.publicAddress,
                nonce: user.nonce
            };
        return null;
    })
};
