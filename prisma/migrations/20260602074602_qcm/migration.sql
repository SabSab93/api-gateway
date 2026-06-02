/*
  Warnings:

  - You are about to drop the `Cat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cat" DROP CONSTRAINT "Cat_userId_fkey";

-- DropForeignKey
ALTER TABLE "Stay" DROP CONSTRAINT "Stay_catId_fkey";

-- DropForeignKey
ALTER TABLE "Stay" DROP CONSTRAINT "Stay_roomId_fkey";

-- DropTable
DROP TABLE "Cat";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "Stay";

-- CreateTable
CREATE TABLE "Qcm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Qcm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "qcmId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposition" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Proposition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "propositionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isChecked" BOOLEAN NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("propositionId","userId")
);

-- AddForeignKey
ALTER TABLE "Proposition" ADD CONSTRAINT "Proposition_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_propositionId_fkey" FOREIGN KEY ("propositionId") REFERENCES "Proposition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
