/*
  Warnings:

  - The primary key for the `Job` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Job` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `sent` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`id`);
