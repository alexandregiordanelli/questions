-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `tag` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),
    `mediaId` INTEGER,
    `text` TEXT NOT NULL,
UNIQUE INDEX `Customer.userId_unique`(`userId`),
UNIQUE INDEX `Customer.tag_unique`(`tag`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notebook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `mediaId` INTEGER,
    `text` TEXT,
    `price` DOUBLE,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),
UNIQUE INDEX `Notebook.tag_unique`(`tag`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notebookId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubTopic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topicId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `notebookId` INTEGER NOT NULL,
    `solution` TEXT,
    `name` VARCHAR(191),
    `subTopicId` INTEGER,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),
    `order` INTEGER NOT NULL,
UNIQUE INDEX `Question.notebookId_tag_unique`(`notebookId`, `tag`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alternative` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` TEXT NOT NULL,
    `questionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RightAlternative` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alternativeId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),
UNIQUE INDEX `RightAlternative.alternativeId_unique`(`alternativeId`),
UNIQUE INDEX `RightAlternative.questionId_unique`(`questionId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChosenAlternative` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `alternativeId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),
UNIQUE INDEX `ChosenAlternative.customerId_questionId_unique`(`customerId`, `questionId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ext` VARCHAR(191) NOT NULL,
    `mime` VARCHAR(191) NOT NULL,
    `size` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),
    `text` VARCHAR(191),
    `caption` VARCHAR(191),
    `width` INTEGER,
    `height` INTEGER,
UNIQUE INDEX `Media.customerId_tag_unique`(`customerId`, `tag`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notebook` ADD FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notebook` ADD FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Topic` ADD FOREIGN KEY (`notebookId`) REFERENCES `Notebook`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubTopic` ADD FOREIGN KEY (`topicId`) REFERENCES `Topic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD FOREIGN KEY (`notebookId`) REFERENCES `Notebook`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD FOREIGN KEY (`subTopicId`) REFERENCES `SubTopic`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alternative` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RightAlternative` ADD FOREIGN KEY (`alternativeId`) REFERENCES `Alternative`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RightAlternative` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChosenAlternative` ADD FOREIGN KEY (`alternativeId`) REFERENCES `Alternative`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChosenAlternative` ADD FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChosenAlternative` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
