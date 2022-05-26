const SteamStrategy = require('passport-steam').Strategy;

export const steamStrategy = new SteamStrategy(
    {
        returnURL: 'http://52.37.206.149:4000/api/auth/steam/return',
        realm: 'http://52.37.206.149:4000/',
        apiKey: 'A8066F8A67DC0B85AD609380454B8065'
    },
    function(identifier: any, profile:any, done: any) {
        process.nextTick(function () {
            profile.identifier = identifier;
            console.log("IDENTIFIER", identifier);
            console.log("PROFILE", profile);
            
            
            return done(null, profile);
        })
    }
)