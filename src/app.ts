//#--------------------APPLICATION---------------------------------#
//#----------------------------------------------------------------#

//#--------------------GLOBAL-IMPORTS:-----------------------------#
import cors from "cors";
import express from "express"
const passport =  require('passport')
import jwt from "jsonwebtoken"
const cookieParser = require("cookie-parser");
const session = require('express-session');

//#--------------------LOCAL-IMPORTS:------------------------------#
import config from "./config";
import initApolloServer from "./graphql/graphServer"
import { steamStrategy } from "./passport"

import { findUser, getBalance, updateUserSteam } from "./services/user.services"
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
            res.redirect(`${config.client}/profile`)
        }
    )

    app.get('/balance/:address', async (req, res) => {
        console.log(req.params);
        const publicAddress = req.params.address
        const balance = await getBalance(publicAddress)
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




