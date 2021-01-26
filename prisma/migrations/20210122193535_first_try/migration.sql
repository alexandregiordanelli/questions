-- CreateTable
CREATE TABLE `Customer` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
UNIQUE INDEX `Customer.userId_unique`(`userId`),
UNIQUE INDEX `Customer.username_unique`(`username`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notebook` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `customerId` INT NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191),
    `price` DECIMAL(65,30),
    `name` VARCHAR(191),
UNIQUE INDEX `Notebook.customerId_tag_unique`(`customerId`, `tag`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topic` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `notebookId` INT NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubTopic` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `topicId` INT NOT NULL,
    `name` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `notebookId` INT NOT NULL,
    `solution` VARCHAR(191),
    `title` VARCHAR(191),
    `subTopicId` INT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alternative` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `alternative` VARCHAR(191) NOT NULL,
    `questionId` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RightAlternative` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `alternativeId` INT NOT NULL,
    `questionId` INT NOT NULL,
UNIQUE INDEX `RightAlternative.alternativeId_unique`(`alternativeId`),
UNIQUE INDEX `RightAlternative.questionId_unique`(`questionId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notebook` ADD FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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