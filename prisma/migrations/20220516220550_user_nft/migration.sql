-- CreateTable
CREATE TABLE "NFT" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "durability" INTEGER NOT NULL,
    "owner" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NFT_owner_key" ON "NFT"("owner");

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("publicAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
