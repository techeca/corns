-- DropIndex
DROP INDEX "Purchase_userId_key";

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
