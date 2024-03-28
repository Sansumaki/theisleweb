-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discord_user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Guilds" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discord_guild_id" TEXT NOT NULL,
    "discord_guild_name" TEXT
);

-- CreateTable
CREATE TABLE "SteamBindings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "guild_id" INTEGER NOT NULL,
    "steam_id" TEXT NOT NULL,
    CONSTRAINT "SteamBindings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SteamBindings_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guilds" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IsleServers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "map_key" TEXT NOT NULL,
    "guild_id" INTEGER,
    CONSTRAINT "IsleServers_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guilds" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IsleStore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "server_id" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    CONSTRAINT "IsleStore_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IsleStore_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "IsleServers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeleportLocations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location_x" REAL NOT NULL,
    "location_y" REAL NOT NULL,
    "location_z" REAL NOT NULL,
    "rotation_p" REAL NOT NULL,
    "rotation_y" REAL NOT NULL,
    "rotation_r" REAL NOT NULL,
    "server_id" INTEGER NOT NULL,
    CONSTRAINT "TeleportLocations_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "IsleServers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PoiLocations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "location_x" REAL NOT NULL,
    "location_y" REAL NOT NULL,
    "location_z" REAL NOT NULL,
    "server_id" INTEGER NOT NULL,
    CONSTRAINT "PoiLocations_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "IsleServers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dinos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "adult_class_name" TEXT NOT NULL,
    "sub_class_name" TEXT,
    "juv_class_name" TEXT,
    "hatch_class_name" TEXT,
    "diet" INTEGER NOT NULL,
    "is_sandbox" INTEGER NOT NULL,
    "default_price" INTEGER NOT NULL,
    "base_damage" INTEGER,
    "alt_damage" INTEGER,
    "health" INTEGER,
    "weight" INTEGER,
    "speed" REAL,
    "ambush" REAL,
    "sprint_seconds" INTEGER,
    "base_bleed" INTEGER,
    "growth_minutes_adult" INTEGER,
    "growth_minutes_sub" INTEGER,
    "growth_minutes_juv" INTEGER,
    "growth_minutes_hatch" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_discord_user_id_key" ON "Users"("discord_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Guilds_discord_guild_id_key" ON "Guilds"("discord_guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "IsleServers_key_key" ON "IsleServers"("key");

