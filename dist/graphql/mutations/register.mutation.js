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
exports.resolveRegisterMutation = exports.typedefRegisterMutation = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const auth_services_1 = require("../../services/auth.services");
exports.typedefRegisterMutation = (0, apollo_server_express_1.gql) `
    extend type Mutation {
        register (
            publicAddress: String!,
            email: String!,
            firstName: String!,
            surname: String!
            steamId: String!
        ): Auth
    }
`;
exports.resolveRegisterMutation = {
    register: (source, { publicAddress, email, firstName, surname, steamId }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("REGISTER-MUTATION INITIATED:", publicAddress, email, firstName, surname, steamId);
        const regRes = yield (0, auth_services_1.registerService)({
            publicAddress,
            email,
            firstName,
            surname,
            steamId
        });
        console.log("REGISTER-MUTATION: REGISTER-SERVICE RESPONSE:", regRes);
        return regRes;
    })
};
