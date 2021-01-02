-- CreateTable
CREATE TABLE `Notebook` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `data` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65,30),
    `name` VARCHAR(191),
    `url` VARCHAR(191) NOT NULL,
UNIQUE INDEX `Notebook.url_unique`(`url`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `notebookId` INT NOT NULL,
UNIQUE INDEX `Menu.notebookId_unique`(`notebookId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topic` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `menuId` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubTopic` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `topicId` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alternative` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `data` VARCHAR(191) NOT NULL,
    `questionId` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `questionId` INT NOT NULL,
    `answerOptionId` INT NOT NULL,
UNIQUE INDEX `Answer.questionId_unique`(`questionId`),
UNIQUE INDEX `Answer.answerOptionId_unique`(`answerOptionId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `solution` VARCHAR(191),
    `subTopicId` INT NOT NULL,
    `title` VARCHAR(191),
    `url` VARCHAR(191) NOT NULL,
    `answerId` INT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Menu` ADD FOREIGN KEY (`notebookId`) REFERENCES `Notebook`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Topic` ADD FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubTopic` ADD FOREIGN KEY (`topicId`) REFERENCES `Topic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alternative` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD FOREIGN KEY (`answerOptionId`) REFERENCES `Alternative`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD FOREIGN KEY (`subTopicId`) REFERENCES `SubTopic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
