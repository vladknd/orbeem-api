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
            nftID: String!
        ): Claim
    }
`;


export const resolveClaimTokensQuery = {
    claimTokens: async (
        source: undefined,
        {
            publicAddress,
            nftID
        }: { publicAddress: string, nftID: string}
    ) => {
        console.log("HEEREEE 1", publicAddress, nftID);
        const game = new Game(nftID, publicAddress)
        
        await game.setGame()

        try {
            console.log("HEEREEE");
            const claimed = await game.claimTokens()
            console.log("MINTED", claimed);
            
            return {success: claimed}
        } catch (error) {
            if(error instanceof ErrorVerification) return { error: "ErrorVerification"}
            else if(error instanceof ErrorDischarged) return { error: "ErrorDischarged"}
            else if(error instanceof ErrorNoData) return {error: "ErrorNoData"}
            throw new Error("CLAIM-TOKENS-MUTATION: UNKNOWN ERROR")
        }
    }
}