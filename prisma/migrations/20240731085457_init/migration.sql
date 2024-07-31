-- CreateTable
CREATE TABLE "AskBuyLog" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "AskBuyLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AskAccount" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "askUserId" INTEGER NOT NULL,

    CONSTRAINT "AskAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AskUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "qq" TEXT NOT NULL,

    CONSTRAINT "AskUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AskAccount_askUserId_key" ON "AskAccount"("askUserId");

-- CreateIndex
CREATE UNIQUE INDEX "AskUser_qq_key" ON "AskUser"("qq");

-- AddForeignKey
ALTER TABLE "AskBuyLog" ADD CONSTRAINT "AskBuyLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AskUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AskAccount" ADD CONSTRAINT "AskAccount_askUserId_fkey" FOREIGN KEY ("askUserId") REFERENCES "AskUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
