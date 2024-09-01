/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "Blogs" (
    "blogs_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("blogs_id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "comments_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "blogs_id" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("comments_id")
);

-- CreateTable
CREATE TABLE "Like" (
    "like_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "blogs_id" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("like_id")
);

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_blogs_id_fkey" FOREIGN KEY ("blogs_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_blogs_id_fkey" FOREIGN KEY ("blogs_id") REFERENCES "Blogs"("blogs_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_blogs_id_fkey" FOREIGN KEY ("blogs_id") REFERENCES "Blogs"("blogs_id") ON DELETE RESTRICT ON UPDATE CASCADE;
