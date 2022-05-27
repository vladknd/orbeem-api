const SteamStrategy = require('passport-steam').Strategy;

export const steamStrategy = new SteamStrategy(
    {
        //HEROKU:
        returnURL: 'https://orbeem-api.herokuapp.com/api/auth/steam/return',
        realm: 'https://https://orbeem-api.herokuapp.com/',

        //HEROKU:
        // returnURL: 'http://localhost:4000/api/auth/steam/return',
        // realm: 'http://localhost:4000/',


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