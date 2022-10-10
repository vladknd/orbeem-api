/*
  Warnings:

  - You are about to drop the `Nft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Nft";

-- CreateTable
CREATE TABLE "NFT" (
    "nftID" TEXT NOT NULL,
    "charged" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "NFT_nftID_key" ON "NFT"("nftID");
