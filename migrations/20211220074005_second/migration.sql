/*
  Warnings:

  - You are about to drop the column `author` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `publishDate` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Upgrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_assignToStudent_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_customer_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_author_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_bookings_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_hotelBranch_fkey";

-- DropForeignKey
ALTER TABLE "Upgrade" DROP CONSTRAINT "Upgrade_cars_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_B_fkey";

-- DropIndex
DROP INDEX "Post_author_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "author",
DROP COLUMN "publishDate",
DROP COLUMN "status",
DROP COLUMN "title",
ADD COLUMN     "businessLogo" JSONB,
ADD COLUMN     "subHeader" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "titleHeader" TEXT NOT NULL DEFAULT E'';

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "Car";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Hotel";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "Upgrade";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_Post_tags";

-- DropEnum
DROP TYPE "BookCategoryType";

-- DropEnum
DROP TYPE "StudentClassType";
