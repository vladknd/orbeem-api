export const authResolver = {
    Auth: {
        __resolveType: (obj: any) => {
            if(obj.token){
                return "AuthSuccess"
            }
            if(obj.message){
                return "AuthError"
            }
        }
    },
    //_______________________GAME_____________________________
    Mint: {
        __resolveType: (obj: any) => {
            if(obj.success){
                return "MintSuccess"
            }
            if(obj.error){
                return "MintError"
            }
        }
    },
    Claim: {
        __resolveType: (obj: any) => {
            if(obj.success){
                return "ClaimSuccess"
            }
            if(obj.error){
                return "ClaimError"
            }
        }
    }
}