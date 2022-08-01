import { gql } from 'apollo-server-express'
import Game from '../../services/game.services';
import { dischargeNFT } from '../../services/nft.services';

export const typedefMintTokensMutation = gql`

    extend type Mutation {
        mintTokens (
            publicAddress: String!,
            tokenID: Int!
        ): Int
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
        const minted = await game.mintTokens()
        // await dischargeNFT(tokenID)
        return minted
    }

}