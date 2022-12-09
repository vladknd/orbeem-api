"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contracts = exports.config = void 0;
require('dotenv').config();
exports.config = {
    subgraph: process.env.SUBGRAPH,
    api: process.env.API,
    client: process.env.CLIENT
};
//CONTRACTS-DEV
// export const contracts = {
//     orbContract: "0x7cBF2774872DB1948341532Be903f507EE0BF3f9"
// }
//CONTRACTS-PROD
exports.contracts = {
    orbContract: "0x7cBF2774872DB1948341532Be903f507EE0BF3f9"
};
