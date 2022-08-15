require('dotenv').config()


export const config = {
    // api: "http://orbeem-api.herokuapp.com",
    // client: "https://www.orbeem.store"

    // api: "http://localhost:4000",
    // client: "http://localhost:3000"

    api: process.env.API,
    client: process.env.CLIENT
}

export const contracts = {
    orbContract: "0xa2b4FD4EE39c9f04c1e534E238e0688F64fF395b"
}