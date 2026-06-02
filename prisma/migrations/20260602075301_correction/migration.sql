-- DropForeignKey
ALTER TABLE "Proposition" DROP CONSTRAINT "Proposition_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_propositionId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_userId_fkey";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_qcmId_fkey" FOREIGN KEY ("qcmId") REFERENCES "Qcm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposition" ADD CONSTRAINT "Proposition_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_propositionId_fkey" FOREIGN KEY ("propositionId") REFERENCES "Proposition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
