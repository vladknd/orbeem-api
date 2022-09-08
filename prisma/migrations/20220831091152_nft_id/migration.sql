/*
  Warnings:

  - You are about to drop the column `tokenID` on the `Nft` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nftID]` on the table `Nft` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nftID` to the `Nft` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Nft_tokenID_key";

-- AlterTable
ALTER TABLE "Nft" DROP COLUMN "tokenID",
ADD COLUMN     "nftID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Nft_nftID_key" ON "Nft"("nftID");
