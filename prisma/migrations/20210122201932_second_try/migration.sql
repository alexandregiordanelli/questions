/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[notebookId,tag]` on the table `Question`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Question.notebookId_tag_unique` ON `Question`(`notebookId`, `tag`);
