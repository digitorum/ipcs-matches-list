/*
  Warnings:

  - A unique constraint covering the columns `[id,countryId]` on the table `cities` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cities` MODIFY `countryId` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `federations` MODIFY `fullName` VARCHAR(191) NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `locations` MODIFY `cityId` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `matches` MODIFY `federationId` INTEGER NULL DEFAULT NULL,
    MODIFY `endDate` DATETIME(3) NULL DEFAULT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `cities_id_countryId_key` ON `cities`(`id`, `countryId`);
