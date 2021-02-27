/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[order,subTopicId]` on the table `Question`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[order,topicId]` on the table `SubTopic`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[order,notebookId]` on the table `Topic`. If there are existing duplicate values, the migration will fail.
  - Added the required column `order` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `SubTopic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` MODIFY `text` TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Question` ADD COLUMN     `order` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `SubTopic` ADD COLUMN     `order` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Topic` ADD COLUMN     `order` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Question.order_subTopicId_unique` ON `Question`(`order`, `subTopicId`);

-- CreateIndex
CREATE UNIQUE INDEX `SubTopic.order_topicId_unique` ON `SubTopic`(`order`, `topicId`);

-- CreateIndex
CREATE UNIQUE INDEX `Topic.order_notebookId_unique` ON `Topic`(`order`, `notebookId`);
