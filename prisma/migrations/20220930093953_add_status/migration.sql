-- AlterTable
ALTER TABLE `Job` ADD COLUMN `status` ENUM('PROGRESS', 'COMPLETE') NOT NULL DEFAULT 'PROGRESS';