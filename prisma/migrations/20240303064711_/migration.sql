/*
  Warnings:

  - You are about to drop the `playing_with_neon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "playing_with_neon";

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "price" DECIMAL(10,2),
    "discount_percentage" DECIMAL(5,2),
    "rating" DECIMAL(3,2),
    "stock" INTEGER,
    "brand" VARCHAR(255),
    "thumbnail" VARCHAR(255),
    "image1" VARCHAR(255),
    "image2" VARCHAR(255),
    "image3" VARCHAR(255),
    "image4" VARCHAR(255),
    "image5" VARCHAR(255),
    "category_id" INTEGER,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
