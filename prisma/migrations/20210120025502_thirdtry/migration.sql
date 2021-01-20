/*
  Warnings:

  - Added the required column `userId` to the `Notebook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notebook` ADD COLUMN     `userId` INT NOT NULL;

-- AddForeignKey
ALTER TABLE `Notebook` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
