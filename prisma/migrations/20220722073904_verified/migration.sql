/*
  Warnings:

  - Added the required column `steamId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `balance` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "steamId",
ADD COLUMN     "steamId" INTEGER NOT NULL,
ALTER COLUMN "balance" SET NOT NULL,
ALTER COLUMN "balance" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_steamId_key" ON "User"("steamId");
