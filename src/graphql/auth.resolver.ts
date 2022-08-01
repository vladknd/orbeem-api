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
    }
}