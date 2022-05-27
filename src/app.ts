//#--------------------APPLICATION---------------------------------#
//#----------------------------------------------------------------#

//#--------------------GLOBAL-IMPORTS:-----------------------------#
import express from "express"
const passport =  require('passport')
// const SteamStrategy = require('passport-steam')
import jwt from "jsonwebtoken"
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

    app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
        console.log("REQ_USER_1", req.user);
        // res.cookie("jwt", req.cookies.jwt)
        // res.send()
    });

    app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
        console.log("REQ_USER_2", req);
        console.log("REQ_USER_2_COOKIES", req.cookies);
        res.redirect("http://orbeem-client.vercel.app/profile")
        updateSteam(req)
    });

    const updateSteam = async (request: any) => {
        const decoded = await jwt.verify(request.cookies.jwt, "hihi")
        console.log("DECODED JWT STEAM", decoded)
        if(typeof decoded !== "string"){
            await updateUserSteam(decoded.publicAddress, request.user.id, request.user.displayName)
        }
    }

    app.listen(process.env.PORT || 4000, () => {
        console.log('SERVER RUNS ON PORT: ', 4000)
    })
}
start()




