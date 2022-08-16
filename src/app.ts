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

//#--------------------LOCAL-IMPORTS:------------------------------#
import {contracts, config} from "./config";
import initApolloServer from "./graphql/graphServer"
import { steamStrategy } from "./passport"
// const ORB = require('./ABI/orb.json')
import ORB from './ABI/orb'

import { deductBalance, findUser, getBalance, updateUserSteam } from "./services/user.services"
//#--------------------BODY----------------------------------------#
const start = async () => {
    

    //___________________________PASSPORT________________________
    passport.serializeUser((user: any, done: any) => {
        done(null, user);
    });

    passport.deserializeUser((user: any, done: any) => {
        done(null, user);
    });
  
    passport.use(steamStrategy)
    //________________________________________________________________


    const apolloServer = initApolloServer()
    const app = express()
    
    app.use(cookieParser())

    await apolloServer.start() 
    apolloServer.applyMiddleware({ app })

    const provider = new ethers.providers.WebSocketProvider("wss://polygon-mainnet.g.alchemy.com/v2/cycXblIGPF5uKOMAFxu5qtEjecfCGMi9")
    const orb = new ethers.Contract(contracts.orbContract, ORB, provider)
    orb.on("MintReward", async (publicAddress, amount)=> {
        console.log({publicAddress, amount: amount.toNumber()});
        await deductBalance(publicAddress.toLowerCase(), amount)
    })
    // app.use(
    //     cors({
    //          origin: config.client, // allow to server to accept request from different origin
    //          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //          credentials: true, // allow session cookie from browser to pass through
    //    })
    // )

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


    app.listen(process.env.PORT || 4000, () => {
        console.log('SERVER RUNS ON PORT: ', 4000)
    })
}
start()




