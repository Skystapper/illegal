/*
  Warnings:

  - You are about to drop the column `reminderDate` on the `consultation` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lastLogin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lockedUntil` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `loginAttempts` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `securitylog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `securitylog` DROP FOREIGN KEY `SecurityLog_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `consultation` DROP COLUMN `reminderDate`;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `lastLogin`,
    DROP COLUMN `lockedUntil`,
    DROP COLUMN `loginAttempts`,
    DROP COLUMN `password`,
    ADD COLUMN `name` VARCHAR(191) NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `securitylog`;

-- DropTable
DROP TABLE `session`;
