-- AlterTable
ALTER TABLE `cities` MODIFY `countryId` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `federations` MODIFY `fullName` VARCHAR(191) NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `locations` MODIFY `cityId` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `matches` MODIFY `federationId` INTEGER NULL DEFAULT NULL,
    MODIFY `endDate` DATETIME(3) NULL DEFAULT NULL,
    MODIFY `exercisesCount` VARCHAR(191) NOT NULL;
