-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "lastcheck" TEXT,
    "lastchat" TEXT,
    "referuser" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "DailyMining" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "invitepoint" INTEGER NOT NULL DEFAULT 0,
    "invitecount" INTEGER NOT NULL DEFAULT 0,
    "chatminingpoint" INTEGER NOT NULL DEFAULT 0,
    "dailycheck" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyMining_discordId_key" ON "DailyMining"("discordId");
