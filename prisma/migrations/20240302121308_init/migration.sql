-- CreateTable
CREATE TABLE "demo_table" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" REAL,

    CONSTRAINT "demo_table_pkey" PRIMARY KEY ("id")
);
