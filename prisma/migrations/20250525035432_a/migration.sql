/*
  Warnings:

  - You are about to drop the `_LevelMaster` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Master` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_LevelMaster" DROP CONSTRAINT "_LevelMaster_A_fkey";

-- DropForeignKey
ALTER TABLE "_LevelMaster" DROP CONSTRAINT "_LevelMaster_B_fkey";

-- AlterTable
ALTER TABLE "Master" ADD COLUMN     "levelId" TEXT;

-- DropTable
DROP TABLE "_LevelMaster";

-- CreateIndex
CREATE UNIQUE INDEX "Master_phone_key" ON "Master"("phone");

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;
