-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_parentThreadId_fkey";

-- AlterTable
ALTER TABLE "Thread" ALTER COLUMN "parentThreadId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_parentThreadId_fkey" FOREIGN KEY ("parentThreadId") REFERENCES "Thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;
