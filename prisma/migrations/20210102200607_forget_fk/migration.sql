/*
  Warnings:

  - You are about to drop the column `answerId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_ibfk_1`;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `answerId`;

-- AddForeignKey
ALTER TABLE `Answer` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
