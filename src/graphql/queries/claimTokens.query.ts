import { gql } from 'apollo-server-express'
import Game, { ErrorDischarged, ErrorNoData, ErrorVerification } from '../../services/game.services';

export const typedefClaimTokensQuery = gql`
    # type MatchResults {
    #     award: Int!
    #     kills: Int!
    #     deaths: Int!
    #     assists: Int!
    # }
    extend type Query {
        claimTokens (
            publicAddress: String!,
            tokenID: Int!
        ): Claim
    }
`;

interface IArgs {
    publicAddress: string,
    tokenID: number
}
export const resolveClaimTokensQuery = {
    
    claimTokens: async (
        source: undefined,
        {
            publicAddress,
            tokenID
        }: IArgs
    ) => {
        const game = new Game(tokenID, publicAddress)
        await game.setGame()

        try {
            const claimed = await game.claimTokens()
            console.log("MINTED", claimed);
            
            return {success: claimed}
        } catch (error) {
            if(error instanceof ErrorVerification) return { error: "ErrorVerification"}
            else if(error instanceof ErrorDischarged) return { error: "ErrorDischarged"}
            else if(error instanceof ErrorNoData) return {error: "ErrorNoData"}
            throw new Error("MINT-TOKEN_MUTATION: UNKNOWN ERROR")
        }
    }
}