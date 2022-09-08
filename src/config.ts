require('dotenv').config()


export const config = {
    // api: "http://orbeem-api.herokuapp.com",
    // client: "https://www.orbeem.store"

    // api: "http://localhost:4000",
    // client: "http://localhost:3000"
    subgraph: process.env.SUBGRAPH,
    api: process.env.API,
    client: process.env.CLIENT
}

export const contracts = {
    orbContract: "0x7cBF2774872DB1948341532Be903f507EE0BF3f9"
}