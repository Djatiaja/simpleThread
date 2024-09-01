/*
  Warnings:

  - Added the required column `img_alt` to the `Blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_url` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "img_alt" TEXT NOT NULL,
ADD COLUMN     "img_url" TEXT NOT NULL;
