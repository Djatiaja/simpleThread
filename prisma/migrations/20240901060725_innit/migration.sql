/*
  Warnings:

  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `blogs_id` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `like_id` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Like` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Blogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Blog_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `User_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blogs" DROP CONSTRAINT "Blogs_blogs_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_blogs_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_blogs_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_user_id_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
DROP COLUMN "blogs_id",
DROP COLUMN "like_id",
DROP COLUMN "user_id",
ADD COLUMN     "Blog_id" INTEGER NOT NULL,
ADD COLUMN     "Like_id" SERIAL NOT NULL,
ADD COLUMN     "User_id" INTEGER NOT NULL,
ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("Like_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "user_id",
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Password" TEXT NOT NULL,
ADD COLUMN     "User_id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("User_id");

-- DropTable
DROP TABLE "Blogs";

-- DropTable
DROP TABLE "Comments";

-- CreateTable
CREATE TABLE "Blog" (
    "Blog_id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "User_id" INTEGER NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("Blog_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "Comment_id" SERIAL NOT NULL,
    "Content" TEXT NOT NULL,
    "Blog_id" INTEGER NOT NULL,
    "User_id" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("Comment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_Blog_id_fkey" FOREIGN KEY ("Blog_id") REFERENCES "Blog"("Blog_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_Blog_id_fkey" FOREIGN KEY ("Blog_id") REFERENCES "Blog"("Blog_id") ON DELETE RESTRICT ON UPDATE CASCADE;
