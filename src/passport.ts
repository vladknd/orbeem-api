const SteamStrategy = require('passport-steam').Strategy;
import config from './config'

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
        return done(null, profile);
        
        
    }
)