-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stay" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "catId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Stay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stay" ADD CONSTRAINT "Stay_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Cat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stay" ADD CONSTRAINT "Stay_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
