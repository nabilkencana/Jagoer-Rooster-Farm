-- CreateTable
CREATE TABLE "ChickenItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "footerText" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "weightRange" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "characterDetail" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
