/*
  Warnings:

  - Added the required column `balance` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Nft" (
    "tokenID" INTEGER NOT NULL,
    "charged" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Nft_tokenID_key" ON "Nft"("tokenID");
