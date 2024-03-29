-- Migration number: 0002 	 2024-03-28T17:03:46.542Z
INSERT INTO Users (id, discord_user_id)
VALUES (1, "238020750269743104"),
       (2, "211691002811908096");

INSERT INTO Guilds (id, discord_guild_id, discord_guild_name)
VALUES (1, "720714005529755769", "FTR");

INSERT INTO SteamBindings (id, user_id, guild_id, steam_id)
VALUES (1, 1, 1, "76561198018491395"),
       (2, 1, 1, "76561198037946570"),
       (3, 2, 1, "76561198037946800");

INSERT INTO IsleServers (id, is_default, key, name, map_key, guild_Id)
VALUES (1, true, "LEGACY_V3", "Default Legacy V3 Map", "Isle_V3", null),
       (2, true, "LEGACY_THENYAW", "Default Thenyaw Map", "Thenyaw", null),
       (3, false, "FTR_Survival", "[GER/ENG] FTR Survival NO RULES / LOW RULES", "Isle_V3", 1),
       (4, false, "FTR_Thenyaw", "[GER/ENG] FTR Thenyaw", "Thenyaw", 1);

INSERT INTO TeleportLocations (name, location_x, location_y, location_z, rotation_p, rotation_y, rotation_r, server_id)
VALUES ("Great Falls", -234074.938, 527362.688, -29331.482, 0.000000, -158.181305, 0.000000, 1),
       ("North Twins", -468281.438, -231666.625, -70130.625, 0.000000, 81.993591, 0.000000, 1),
       ("South Twins", -489043.875, -136860.188, -71197.828, 0.000000, 32.889000, 0.000000, 1),
       ("Ports", 445833.844, 204232.266, -72483.719, 0.000000, 109.940399, 0.000000, 1),
       ("Hidden", 393134.875, 54841.480, -46616.215, 0.000000, 15.386949, 0.000000, 1),
       ("Murky Pond", 318898.188, -111054.180, -26475.877, 0.000000, -134.881973, 0.000000, 1),
       ("Hot Springs", 130842.875, -352798.125, -36980.000, 0.000000, -174.341751, 0.000000, 1),
       ("Ocean Falls", 22597.654, -484652.062, -61091.727, 0.000000, 118.565086, 0.000000, 1),
       ("Northernmost", -134092.359, -462918.781, -44426.094, 0.000000, -161.085892, 0.000000, 1),
       ("The Damn", 26443.365, -158037.641, -64539.641, 0.000000, -44.276989, 0.000000, 1),
       ("Dump/Ravine", -285740.562, -251693.406, -62180.980, 0.000000, -110.542778, 0.000000, 1),
       ("Cargo Pond", -507491.094, -47857.145, -68256.273, 0.000000, 24.507994, 0.000000, 1),
       ("Gulf Pond", -492567.125, 207592.125, -57208.758, 0.000000, -119.936340, 0.000000, 1),
       ("Western Pond", -694461.750, 249040.641, -68251.133, 0.000000, 55.668629, 0.000000, 1),
       ("Puddle Pond", -457411.719, 387254.719, -53509.137, 0.000000, 127.170494, 0.000000, 1),
       ("The Wash", -359214.094, 327595.531, -66224.461, 0.000000, -11.717883, 0.000000, 1),
       ("Sewer Pond", -261371.266, 298606.125, -72554.664, 0.000000, 174.013382, 0.000000, 1),
       ("Lazy River", -151235.703, 469902.312, -69150.898, 0.000000, 151.833710, 0.000000, 1),
       ("East Swamp", 178004.078, 65527.730, -74899.094, 0.000000, -10.793686, 0.000000, 1),
       ("Middle Swamp", -15516.737, 76480.742, -72355.578, 0.000000, 9.153902, 0.000000, 1),
       ("West Swamp", -112992.328, 39093.969, -72684.914, 0.000000, -60.215115, 0.000000, 1),
       ("Canyon Pond", -40044.352, 165452.781, -54524.266, 0.000000, 112.366898, 0.000000, 1);

INSERT INTO PoiLocations (name, location_x, location_y, location_z, description, server_id)
VALUES ("Spawn point 1", -260603.906, 107146.070, -72879.203, "One of the possible spawn points", 1),
       ("Spawn point 2", -378036.219, -27659.000, -73073.711, "One of the possible spawn points", 1),
       ("Spawn point 3", -697316.375, 204614.313, -72237.500, "One of the possible spawn points", 1),
       ("Spawn point 4", -243581.844, 59544.789, -72775.953, "One of the possible spawn points", 1),
       ("Spawn point 5", -516157.375, -4922.734, -72604.109, "One of the possible spawn points", 1),
       ("Spawn point 6", -514126.938, 117951.828, -72919.375, "One of the possible spawn points", 1);



INSERT INTO Dinos (name, adult_class_name, sub_class_name, juv_class_name, hatch_class_name, default_price, diet, is_sandbox,
                   base_damage, alt_damage, health, weight, speed, ambush, sprint_seconds, base_bleed,
                   growth_minutes_adult, growth_minutes_sub, growth_minutes_juv, growth_minutes_hatch)
VALUES ("Diabloceratops", "DiabloAdultS", NULL, "DiabloJuvS", "DiabloHatchS", 5000, 0, FALSE, 350, NULL, 3250, 3250, 31.6, NULL, 150, 18, 100, NULL, 80, 25),
       ("Dryosaurus", "DryoAdultS", NULL, "DryoJuvS", "DryoHatchS", 15000, 0, FALSE, 20, NULL, 500, 700, 41.5, NULL, 250, NULL, 15, NULL, 15, 10),
       ("Gallimimus", "GalliAdultS", NULL, "GalliJuvS", "GalliHatchS", 7500, 0, FALSE, 150, NULL, 800, 1000, 48.6, NULL, 400, NULL, 50, NULL, 40, 15),
       ("Maiasaura", "MaiaAdultS", NULL, "MaiaJuvS", "MaiaHatchS", 7500, 0, FALSE, 175, NULL, 2868, 2868, 44.6, NULL, 180, NULL, 60, NULL, 50, 20),
       ("Pachycephalosaurus", "PachyAdultS", NULL, "PachyJuvS", "PachyHatchS", 7500, 0, FALSE, 350, NULL, 1300, 1300, 40, NULL, 175, NULL, 60, NULL, 70, 20),
       ("Parasaurolophus", "ParaAdultS", NULL, "ParaJuvS", "ParaHatchS", 15000, 0, FALSE, 250, 750, 3600, 3600, 34.2, NULL, 250, NULL, 120, NULL, 60, 25),
       ("Triceratops", "TrikeAdultS", "TrikeSubS", "TrikeJuvS", "TrikeHatchS", 40000, 0, FALSE, 360, 850, 8200, 8300, 25.34, NULL, 66, 25, 100, 200, 60, 30),

       ("Ankylosaurus", "Anky", NULL, "AnkyJuv", NULL, 30000, 0, TRUE, 1260, NULL, 5443, 5443, 19.3, NULL, 120, NULL, 120, NULL, 120, NULL),
       ("Avaceratops", "Ava", NULL, "AvaJuv", NULL, 4000, 0, TRUE, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
       ("Camarasaurus", "Camara", NULL, NULL, NULL, 1000000, 0, TRUE, 750, 5150, 12000, 12000, 20.7, NULL, 70, NULL, NULL, NULL, NULL, NULL),
       ("Orodromeus", "Oro", NULL, NULL, NULL, 3000, 0, TRUE, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
       ("Psittacosaurus", "Taco", NULL, NULL, NULL, 1000, 0, TRUE, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
       ("Puertasaurus", "Puerta", NULL, "PuertaJuv", NULL, 10000000, 0, TRUE, 5000, NULL, 49895, 49895, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
       ("Shantungosaurus", "Shant", NULL, "ShantJuv", NULL, 80000, 0, TRUE, 250, 1100, 11793, 11793, 32.5, NULL, 46, NULL, 240, NULL, 120, NULL),
       ("Stegosaurus", "Stego", NULL, "StegoJuv", NULL, 40000, 0, TRUE, 1200, NULL, 4883, 4883, 26.3, NULL, 90, 30, 120, NULL, 120, NULL),
       ("Therizinosaurus", "Theri", NULL, "TheriJuv", NULL, 40000, 0, TRUE, 350, 700, 4536, 4536, 38.2, NULL, 65, NULL, 120, NULL, 180, NULL),

       ("Allosaurus", "AlloAdultS", NULL, "AlloJuvS", "AlloHatchS", 10000, 1, FALSE, 300, NULL, 2800, 2800, 34.2, 44.5,
        200, 25, 120, NULL, 60, 30),
       ("Carnotaurus", "CarnoAdultS", "CarnoSubS", "CarnoJuvS", "CarnoHatchS", 9000, 1, FALSE, 200, NULL, 2170, 2170,
        52.2, NULL, 220, 15, 70, NULL, 40, 25),
       ("Ceratosaurus", "CeratoAdultS", NULL, "CeratoJuvS", "CeratoHatchS", 10000, 1, FALSE, 350, NULL, 2250, 2250,
        36.6, 40.3, 150, 8, 90, NULL, 50, 30),
       ("Dilophosaurus", "DiloAdultS", NULL, "DiloJuvS", "DiloHatchS", 7500, 1, FALSE, 150, NULL, 1050, 1200, 38.8,
        45.5, 150, 50, 60, NULL, 50, 20),
       ("Giganotosaurus", "GigaAdultS", "GigaSubS", "GigaJuvS", "GigaHatchS", 80000, 1, FALSE, 700, NULL, 6000, 6450,
        30.6, 39.8, 50, 40, 60, 220, 110, 30),
       ("Suchomimus", "SuchoAdultS", NULL, "SuchoJuvS", "SuchoHatchS", 15000, 1, FALSE, 350, NULL, 3600, 3600, 30.9,
        39.3, 200, 20, 150, NULL, 85, 20),
       ("Tyrannosaurus", "RexAdultS", "RexSubS", "RexJuvS", "RexHatchS", 80000, 1, FALSE, 1200, NULL, 6500, 5800, 33.2,
        43.1, 33, 10, 100, 180, 100, 30),
       ("Utahraptor", "UtahAdultS", NULL, "UtahJuvS", "UtahHatchS", 7500, 1, FALSE, 200, NULL, 1200, 1000, 43.2, 56,
        300, 20, 50, NULL, 50, 20),

       ("Acrocanthosaurus", "Acro", NULL, "AcroJuv", NULL, 20000, 1, TRUE, 250, NULL, 4790, 4790, 42.6, 52.2, 27, 25,
        120, NULL, 120, NULL),
       ("Albertosaurus", "Albert", NULL, NULL, NULL, 20000, 1, TRUE, 424, NULL, 3000, 3000, 39.2, 42.1, NULL, 10, 120,
        NULL, NULL, NULL),
       ("Austroraptor", "Austro", NULL, "AustroJuv", NULL, 8000, 1, TRUE, 60, NULL, 250, 250, 39.5, 51.5, 60, 2, 60,
        NULL, 60, NULL),
       ("Baryonyx", "Bary", NULL, "BaryJuv", NULL, 10000, 1, TRUE, 150, NULL, 1450, 1450, 41.3, 49.6, 155, 15, 90, NULL,
        90, NULL),
       ("Herrerasaurus", "Herrera", NULL, "HerreraJuv", NULL, 15000, 1, TRUE, 50, NULL, 500, 500, 55.8, NULL, 130, 10,
        60, NULL, 20, NULL),
       ("Spinosaurus", "Spino", NULL, "SpinoJuv", NULL, 100000, 1, TRUE, 250, NULL, 9071, 90071, 23.3, 34.4, 30, 18,
        180, NULL, 180, NULL),
       ("Velociraptor", "Velo", NULL, NULL, NULL, 2000, 1, TRUE, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        NULL, NULL, NULL);