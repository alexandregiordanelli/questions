/*
  Warnings:

  - You are about to drop the column `notebookId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `solution` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `subTopicId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Question` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[tag]` on the table `Question`. If there are existing duplicate values, the migration will fail.
  - Made the column `name` on table `Question` required. The migration will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_ibfk_2`;

-- DropIndex
DROP INDEX `Question.notebookId_tag_unique` ON `Question`;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `notebookId`,
    DROP COLUMN `solution`,
    DROP COLUMN `subTopicId`,
    DROP COLUMN `order`,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Subscriber` ADD COLUMN     `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN     `updatedAt` DATETIME(3);

-- CreateTable
CREATE TABLE `QuestionSubTopic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NOT NULL,
    `subTopicId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solution` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,
    `text` TEXT NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),
UNIQUE INDEX `Solution.questionId_customerId_unique`(`questionId`, `customerId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Question.tag_unique` ON `Question`(`tag`);

-- AddForeignKey
ALTER TABLE `QuestionSubTopic` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionSubTopic` ADD FOREIGN KEY (`subTopicId`) REFERENCES `SubTopic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solution` ADD FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solution` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
