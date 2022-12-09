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
exports.resolveFindUserByAddressQuery = exports.typedefFindUserByAddressQuery = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const user_services_1 = require("../../services/user.services");
exports.typedefFindUserByAddressQuery = (0, apollo_server_express_1.gql) `
    extend type Query {
        findUserByAddress (
            publicAddress: String!,
        ): User 
    }
`;
exports.resolveFindUserByAddressQuery = {
    findUserByAddress: (source, { publicAddress }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("GOT", publicAddress);
        try {
            const user = yield (0, user_services_1.findUser)(publicAddress);
            console.log(user);
            return user;
        }
        catch (error) {
        }
    })
};
