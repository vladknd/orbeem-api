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
    orbContract: "0xD3f8e57a8cE7199950d556ae3C12A097cD902649"
}