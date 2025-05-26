/*
  Warnings:

  - You are about to drop the column `name` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Capacity` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Level` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Region` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Size` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Tool` table. All the data in the column will be lost.
  - Added the required column `name_en` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `Capacity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `District` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `Level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `Region` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `Size` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT;

-- AlterTable
ALTER TABLE "Capacity" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT;

-- AlterTable
ALTER TABLE "District" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT;

-- AlterTable
ALTER TABLE "Level" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT;

-- AlterTable
ALTER TABLE "Region" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT;

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT;

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_ru" TEXT,
ADD COLUMN     "name_uz" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
