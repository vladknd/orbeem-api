import { Nft, prisma } from "@prisma/client";
import { prismaClient } from "../db";


export const getNFT = async (_nftID: string): Promise<Nft | null> => {
    const nft = await prismaClient.nft.findUnique({
        where: {
            nftID: _nftID
        }
    })
    if(nft) return nft

    const newNFT = await prismaClient.nft.create({
        data: {
            nftID: _nftID,
            charged: true
        }
    })
    console.log("nft has been recorded:", nft)
    
    return newNFT
}

export const getNFTCharge = async (_nftID: string): Promise<boolean> => {
    const nft = await prismaClient.nft.findUnique({where: {
        nftID: _nftID
    }})
    console.log("FIND NFT CHARGE", nft);
    
    if(nft) return nft.charged

    const newNFT = await prismaClient.nft.create({
        data: {
            nftID: _nftID,
            charged: true
        }
    })
    console.log("nft has been recorded:", nft)
    
    return newNFT.charged
}

export const dischargeNFT = async (_nftID: string) => {
    const updatedNFT = await prismaClient.nft.update({
        where: {
            nftID: _nftID
        },
        data: {
            charged: false
        }
    })
}

export const chargeNFTs = async (): Promise<Nft[]> => {
    await prismaClient.nft.updateMany({
        where: {}, 
        data: {
            charged: true
        }
    })
    const nfts = prismaClient.nft.findMany()

    // console.log("NFT-SERVICE: NFTs HAVE BEEN CHARGED", nfts, typeof nfts);
    return nfts
}
    