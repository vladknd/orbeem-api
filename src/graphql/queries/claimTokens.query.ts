import { gql } from 'apollo-server-express'
import Game from '../../services/game.services';

export const typedefClaimTokensQuery = gql`
    type MatchResults {
        award: Int!
        kills: Int!
        deaths: Int!
        assists: Int!
    }
    extend type Query {
        claimTokens (
            publicAddress: String!,
            tokenID: Int!
        ): MatchResults
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
        const loot = await game.claimTokens()
        return loot
    }
}