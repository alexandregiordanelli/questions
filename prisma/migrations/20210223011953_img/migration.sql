-- AlterTable
ALTER TABLE `Notebook` ADD COLUMN     `mediaId` INTEGER;

-- AddForeignKey
ALTER TABLE `Notebook` ADD FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
