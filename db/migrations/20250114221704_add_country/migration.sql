/*
  Warnings:

  - You are about to drop the column `country` on the `cities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cities` DROP COLUMN `country`,
    ADD COLUMN `countryId` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `federations` MODIFY `fullName` VARCHAR(191) NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `locations` MODIFY `cityId` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `matches` MODIFY `federationId` INTEGER NULL DEFAULT NULL,
    MODIFY `endDate` DATETIME(3) NULL DEFAULT NULL;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `countries_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `cities_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `countries`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
