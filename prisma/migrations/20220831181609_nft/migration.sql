/*
  Warnings:

  - You are about to drop the `NFT` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "NFT";

-- CreateTable
CREATE TABLE "Nft" (
    "nftID" TEXT NOT NULL,
    "charged" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Nft_nftID_key" ON "Nft"("nftID");
