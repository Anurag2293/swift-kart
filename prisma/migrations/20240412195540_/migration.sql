/*
  Warnings:

  - Made the column `category_id` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "category_id" SET NOT NULL;
