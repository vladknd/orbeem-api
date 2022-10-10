require('dotenv').config()


export const config = {
    subgraph: process.env.SUBGRAPH,
    api: process.env.API,
    client: process.env.CLIENT
}

//CONTRACTS-DEV
// export const contracts = {
//     orbContract: "0x7cBF2774872DB1948341532Be903f507EE0BF3f9"
// }

//CONTRACTS-PROD
export const contracts = {
    orbContract: "0x7cBF2774872DB1948341532Be903f507EE0BF3f9"
}