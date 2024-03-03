/*
  Warnings:

  - You are about to drop the column `image1` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `image2` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `image3` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `image4` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `image5` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "image1",
DROP COLUMN "image2",
DROP COLUMN "image3",
DROP COLUMN "image4",
DROP COLUMN "image5";

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" SERIAL NOT NULL,
    "imageLink" VARCHAR NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
