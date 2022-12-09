"use strict";
//#--------------------GRAPHQL-INDEX-----------------------------#
//#--------------------------------------------------------------#
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//#--------------------GLOBAL-IMPORTS:---------------------------#
const apollo_server_express_1 = require("apollo-server-express");
//#--------------------LOCAL-IMPORTS:----------------------------#
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
//#--------------------BODY--------------------------------------#
exports.default = () => {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: resolvers_1.default,
        context: ({ req }) => {
            console.log("REQ:", req.headers);
        }
    });
    return apolloServer;
};
