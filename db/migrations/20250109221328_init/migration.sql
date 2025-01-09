-- CreateTable
CREATE TABLE "platforms" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "federations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fullName" TEXT DEFAULT NULL
);

-- CreateTable
CREATE TABLE "cities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT DEFAULT NULL
);

-- CreateTable
CREATE TABLE "locations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "cityId" INTEGER DEFAULT NULL,
    CONSTRAINT "locations_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "disciplines" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "matches" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "platformId" INTEGER NOT NULL,
    "federationId" INTEGER DEFAULT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME DEFAULT NULL,
    "level" INTEGER NOT NULL,
    "exercisesCount" INTEGER NOT NULL,
    "minimumShots" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    CONSTRAINT "matches_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platforms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matches_federationId_fkey" FOREIGN KEY ("federationId") REFERENCES "federations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "disciplines_on_match" (
    "matchId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    CONSTRAINT "disciplines_on_match_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "disciplines_on_match_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "url_for_processing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "platformId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "tries" INTEGER NOT NULL,
    CONSTRAINT "url_for_processing_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platforms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "federations_name_key" ON "federations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "locations_description_key" ON "locations"("description");

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_name_key" ON "disciplines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "matches_url_key" ON "matches"("url");

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_on_match_matchId_disciplineId_key" ON "disciplines_on_match"("matchId", "disciplineId");
