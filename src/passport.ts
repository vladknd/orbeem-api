const SteamStrategy = require('passport-steam').Strategy;
import {config }from './config'
import { setVerified, updateUserSteam } from './services/user.services';

export const steamStrategy = new SteamStrategy(
    {
        returnURL: `${config.api}/api/auth/steam/return`,
        realm: `${config.api}/`,
        apiKey: 'A8066F8A67DC0B85AD609380454B8065'
    },
    (identifier: any, profile:any, done: any) => {
        // process.nextTick(function () {
        //     profile.identifier = identifier;
        //     console.log("IDENTIFIER", identifier);
        //     console.log("PROFILE", profile);
            
            
        //     return done(null, profile);
        // })
        console.log("PASSPORT CALLBACK FIRED!")
        console.log("IDENTIFIER", identifier);
        console.log("PROFILE", profile);

        verifySteam(profile.id, profile.displayName).then(_promise => {
            console.log("USER SUCCESFULLY VERIFIED!")
        }).catch(error => {
            console.log("USER COULD NOT BE VERIFIED!", error)
        })

        return done(null, profile);
        
        
    }
)

const verifySteam = async ( _steamId: string, _username: string) => {
    // updateUserSteam(username, steamId).then((_promise) => {
    //     console.log("USER's STEAM HAS BEEN VERIFIED!", _promise);
    // }).catch(error => {
    //     console.log("USER's STEAM COULD NOT BE VERIFIED!", error)  
    // })
    await setVerified(_steamId, _username)
}
