//#--------------------APPLICATION---------------------------------#
//#----------------------------------------------------------------#

//#--------------------GLOBAL-IMPORTS:-----------------------------#
import cors from "cors";
import express from "express"
const passport =  require('passport')
// const SteamStrategy = require('passport-steam')
import jwt from "jsonwebtoken"
import config from "./config";
const cookieParser = require("cookie-parser");
const session = require('express-session');
// import SteamStrategy from 'passport-steam'
//#--------------------LOCAL-IMPORTS:------------------------------#
import initApolloServer from "./graphql"
import { steamStrategy } from "./passport"

import { findUser, updateUserSteam } from "./services/user/user.service"
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
            res.redirect("http://localhost:3000/profile")
        }
    )

    app.post('/api/update-steam', (req, res) => {
        console.log(req)
    })

    // const updateSteam = async (request: any) => {
    //     const decoded = await jwt.verify(request.cookies.jwt, "hihi")
    //     console.log("DECODED JWT STEAM", decoded)
    //     if(typeof decoded !== "string"){
    //         await updateUserSteam(decoded.publicAddress, request.user.id, request.user.displayName)
    //     }
    // }

    app.listen(process.env.PORT || 4000, () => {
        console.log('SERVER RUNS ON PORT: ', 4000)
    })
}
start()




