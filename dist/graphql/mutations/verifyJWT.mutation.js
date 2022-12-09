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
exports.resolveVerifyJwtMutation = exports.typedefVerifyJwtMutation = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_services_1 = require("../../services/user.services");
exports.typedefVerifyJwtMutation = (0, apollo_server_express_1.gql) `
    extend type Mutation {
        verifyJwt(token: String): User 
    }
`;
exports.resolveVerifyJwtMutation = {
    verifyJwt: (_, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("VERIFY JWT MUTATION INITIATED:");
        const decoded = yield jsonwebtoken_1.default.verify(token, "hihi");
        if (typeof decoded !== "string") {
            console.log("DECODED", decoded.publicAddress);
            const user = yield (0, user_services_1.findUser)(decoded.publicAddress);
            console.log("USER", user);
            return user;
        }
    })
};
