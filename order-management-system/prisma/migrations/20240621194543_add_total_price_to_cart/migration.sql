/*
  Warnings:

  - Added the required column `cartTotalPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "cartTotalPrice" DECIMAL(10,2) NOT NULL;
