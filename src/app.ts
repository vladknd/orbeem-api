//#--------------------APPLICATION---------------------------------#
//#----------------------------------------------------------------#

//#--------------------GLOBAL-IMPORTS:-----------------------------#
import cors from "cors";
import { ethers } from "ethers";
import express from "express"
const passport =  require('passport')
import jwt from "jsonwebtoken"
const cookieParser = require("cookie-parser");
const session = require('express-session');
const cron = require("node-cron")

//#--------------------LOCAL-IMPORTS:------------------------------#
import {
    contracts, 
    config
} from "./config";
import initApolloServer from "./graphql/graphServer"
import { steamStrategy } from "./passport"
import ORB from './ABI/orb'

import { 
    deductBalance,  
    getBalance
} from "./services/user.services"
import { chargeNFTs } from "./services/nft.services";
//#--------------------BODY----------------------------------------#
const start = async () => {
    //_____________________________________________________PASSPORT:
    passport.serializeUser((user: any, done: any) => {
        done(null, user);
    });

    passport.deserializeUser((user: any, done: any) => {
        done(null, user);
    });
  
    passport.use(steamStrategy)
    //_____________________________________________________________



    const apolloServer = initApolloServer()
    const app = express()
    
    app.use(cookieParser())

    await apolloServer.start() 
    apolloServer.applyMiddleware({ app })

    //___________________________________ORB MINT LISTENER:
    const provider = new ethers.providers.WebSocketProvider(
        "wss://polygon-mainnet.g.alchemy.com/v2/cycXblIGPF5uKOMAFxu5qtEjecfCGMi9"
    )
    const orb = new ethers.Contract(contracts.orbContract, ORB, provider)
    orb.on("MintReward", async (publicAddress, amount) => {
        console.log({publicAddress, amount: amount.toNumber()});
        await deductBalance(publicAddress.toLowerCase(), amount)
    })
    //_____________________________________________________

    //_________________________________________________CORS:
    // app.use(
    //     cors({
    //          origin: config.client, // allow to server to accept request from different origin
    //          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //          credentials: true, // allow session cookie from browser to pass through
    //    })
    // )
    //_____________________________________________________

    //_______________________SESSION:
    app.use(session(
        {
            secret: 'your secret',
            saveUninitialized: true,
            resave: false,
            cookie: {
                maxAge: 3600000
            }
        })
    );
    //_______________________________

    //_________________________________________STEAM-AUTH:
    app.use(passport.initialize())
    app.use(passport.session())
    app.get('/api/auth/steam', 
        passport.authenticate('steam', {failureRedirect: '/'}), 
        (req, res) => {
            console.log("REQ_USER_1", req.user);
        }
    )
    
    app.get('/api/auth/steam/return', 
        passport.authenticate('steam', {failureRedirect: '/'}), 
        (req, res) => {
            console.log("REQ_USER", req.user);
            console.log("REQ_COOKIES", req.cookies);
            console.log("PARAMS", req.params);
            res.redirect(`${config.client}/dashboard`)
        }
    )
    //_____________________________________________________

    //_____________________________________ORACLE-MINTER:
    app.get('/balance/:address', async (req, res) => {
        console.log("CHECK FOR BALANCE INIT:",req.params);
        const publicAddress = req.params.address
        const balance = await getBalance(publicAddress.toLowerCase())
        console.log(balance);
        
        res.send({balance})
    })
    app.post('/api/update-steam', (req, res) => {
        console.log(req)
    })
    //________________________________________________________

    //______________________CRON CHARGER:
    cron.schedule('0 0 * * *', () => {
        chargeNFTs().then(_promise => {
            console.log("NFTs HAVE BEEN charged");
        })
    })
    //____________________________________




    app.listen(process.env.PORT || 4000, () => {
        console.log('SERVER RUNS ON PORT: ', 4000)
    })
}
start()




