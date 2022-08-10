import { gql } from 'apollo-server-express'
import Game, { ErrorDischarged, ErrorVerification } from '../../services/game.services';
import { dischargeNFT } from '../../services/nft.services';

export const typedefMintTokensMutation = gql`

    extend type Mutation {
        mintTokens (
            publicAddress: String!,
            tokenID: Int!
        ): Mint
    }
`;

interface IArgs {
    publicAddress: string,
    tokenID: number
}
export const resolveMintTokensMutation = {
    mintTokens: async (
        source: undefined,
        {
            publicAddress,
            tokenID
        }: IArgs
    ) => {
        const game = new Game(tokenID, publicAddress)
        await game.setGame()
        try {
            const minted = await game.mintTokens()
            console.log("MINTED", minted);
            
            return {success: minted}
        } catch (error) {
            if(error instanceof ErrorVerification) return { error: "ErrorVerification"}
            else if(error instanceof ErrorDischarged) return { error: "ErrorDischarged"}
            throw new Error("MINT-TOKEN_MUTATION: UNKNOWN ERROR")
        }
        
    }
    // Mint: {
    //     __resolveType: (obj: any) => {
    //         if(obj.success){
    //             return "MintSucces"
    //         }
    //         if(obj.error){
    //             return "MintError"
    //         }
    //     }
    // }

}