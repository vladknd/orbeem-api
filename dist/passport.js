"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.steamStrategy = void 0;
const SteamStrategy = require('passport-steam').Strategy;
const config_1 = require("./config");
const user_services_1 = require("./services/user.services");
exports.steamStrategy = new SteamStrategy({
    returnURL: `${config_1.config.api}/api/auth/steam/return`,
    realm: `${config_1.config.api}/`,
    apiKey: 'A8066F8A67DC0B85AD609380454B8065'
}, (identifier, profile, done) => {
    // process.nextTick(function () {
    //     profile.identifier = identifier;
    //     console.log("IDENTIFIER", identifier);
    //     console.log("PROFILE", profile);
    //     return done(null, profile);
    // })
    console.log("PASSPORT CALLBACK FIRED!");
    console.log("IDENTIFIER", identifier);
    console.log("PROFILE", profile);
    verifySteam(profile.id, profile.displayName).then(_promise => {
        console.log("USER SUCCESFULLY VERIFIED!");
    }).catch(error => {
        console.log("USER COULD NOT BE VERIFIED!", error);
    });
    return done(null, profile);
});
const verifySteam = (_steamId, _username) => __awaiter(void 0, void 0, void 0, function* () {
    // updateUserSteam(username, steamId).then((_promise) => {
    //     console.log("USER's STEAM HAS BEEN VERIFIED!", _promise);
    // }).catch(error => {
    //     console.log("USER's STEAM COULD NOT BE VERIFIED!", error)  
    // })
    yield (0, user_services_1.setVerified)(_steamId, _username);
});
