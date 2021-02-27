-- DropIndex
DROP INDEX `SubTopic.order_topicId_unique` ON `SubTopic`;

-- DropIndex
DROP INDEX `Question.order_subTopicId_unique` ON `Question`;

-- DropIndex
DROP INDEX `Topic.order_notebookId_unique` ON `Topic`;

-- AlterTable
ALTER TABLE `Customer` MODIFY `text` TEXT NOT NULL DEFAULT '';
