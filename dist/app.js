"use strict";
//#--------------------APPLICATION---------------------------------#
//#----------------------------------------------------------------#
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const express_1 = __importDefault(require("express"));
const passport = require('passport');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const cron = require("node-cron");
//#--------------------LOCAL-IMPORTS:------------------------------#
const config_1 = require("./config");
const graphServer_1 = __importDefault(require("./graphql/graphServer"));
const passport_1 = require("./passport");
const orb_1 = __importDefault(require("./ABI/orb"));
const user_services_1 = require("./services/user.services");
const nft_services_1 = require("./services/nft.services");
//#--------------------BODY----------------------------------------#
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    //_____________________________________________________PASSPORT:
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(passport_1.steamStrategy);
    //_____________________________________________________________
    const apolloServer = (0, graphServer_1.default)();
    const app = (0, express_1.default)();
    app.use(cookieParser());
    yield apolloServer.start();
    apolloServer.applyMiddleware({ app });
    //___________________________________ORB MINT LISTENER:
    const provider = new ethers_1.ethers.providers.WebSocketProvider("wss://polygon-mainnet.g.alchemy.com/v2/cycXblIGPF5uKOMAFxu5qtEjecfCGMi9");
    const orb = new ethers_1.ethers.Contract(config_1.contracts.orbContract, orb_1.default, provider);
    orb.on("MintReward", (publicAddress, amount) => __awaiter(void 0, void 0, void 0, function* () {
        console.log({ publicAddress, amount: amount.toNumber() });
        yield (0, user_services_1.deductBalance)(publicAddress.toLowerCase(), amount);
    }));
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
    app.use(session({
        secret: 'your secret',
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 3600000
        }
    }));
    //_______________________________
    //_________________________________________STEAM-AUTH:
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/api/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
        console.log("REQ_USER_1", req.user);
    });
    app.get('/api/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
        console.log("REQ_USER", req.user);
        console.log("REQ_COOKIES", req.cookies);
        console.log("PARAMS", req.params);
        res.redirect(`${config_1.config.client}/dashboard`);
    });
    //_____________________________________________________
    //_____________________________________ORACLE-MINTER:
    app.get('/balance/:address', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("CHECK FOR BALANCE INIT:", req.params);
        const publicAddress = req.params.address;
        const balance = yield (0, user_services_1.getBalance)(publicAddress.toLowerCase());
        console.log(balance);
        res.send({ balance });
    }));
    app.post('/api/update-steam', (req, res) => {
        console.log(req);
    });
    //________________________________________________________
    //______________________CRON CHARGER:
    cron.schedule('0 0 * * *', () => {
        (0, nft_services_1.chargeNFTs)().then(_promise => {
            console.log("NFTs HAVE BEEN charged");
        });
    });
    //____________________________________
    app.listen(process.env.PORT || 4000, () => {
        console.log('SERVER RUNS ON PORT: ', 4000);
    });
});
start();
