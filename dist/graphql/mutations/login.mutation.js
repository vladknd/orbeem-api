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
exports.resolveLoginMutation = exports.typedefLoginMutation = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const auth_services_1 = require("../../services/auth.services");
exports.typedefLoginMutation = (0, apollo_server_express_1.gql) `
    type Verified {
        token: String!
        user: User
    }
    extend type Mutation {
        login(
            publicAddress: String!
            signature: String!
        ): Verified
    }
`;
exports.resolveLoginMutation = {
    login: (_, { publicAddress, signature }) => __awaiter(void 0, void 0, void 0, function* () {
        const authRes = yield (0, auth_services_1.loginService)({ publicAddress, signature });
        console.log("AUTH-RES:", authRes);
        return authRes;
    })
};
