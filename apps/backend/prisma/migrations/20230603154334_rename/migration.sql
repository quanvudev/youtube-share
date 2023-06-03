/*
  Warnings:

  - You are about to drop the `Thump` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ThumbType" AS ENUM ('UP', 'DOWN');

-- DropForeignKey
ALTER TABLE "Thump" DROP CONSTRAINT "Thump_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Thump" DROP CONSTRAINT "Thump_videoId_fkey";

-- DropTable
DROP TABLE "Thump";

-- DropEnum
DROP TYPE "ThumpType";

-- CreateTable
CREATE TABLE "Thumb" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,
    "type" "ThumbType" NOT NULL DEFAULT 'UP',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Thumb_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Thumb" ADD CONSTRAINT "Thumb_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumb" ADD CONSTRAINT "Thumb_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
