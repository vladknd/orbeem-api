/*
  Warnings:

  - You are about to drop the `NFT` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[steamId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "NFT" DROP CONSTRAINT "NFT_owner_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "steamId" TEXT;

-- DropTable
DROP TABLE "NFT";

-- CreateIndex
CREATE UNIQUE INDEX "User_steamId_key" ON "User"("steamId");
