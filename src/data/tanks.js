const tanks = Object.freeze({
    "1": {
        "name": "T-34",
        "nation": "ussr",
        "tier": 5
    },
    "17": {
        "name": "Pz.Kpfw. IV Ausf. G",
        "nation": "germany",
        "tier": 5
    },
    "33": {
        "name": "T14",
        "nation": "usa",
        "tier": 5
    },
    "49": {
        "name": "Type 59",
        "nation": "china",
        "tier": 8
    },
    "81": {
        "name": "Medium I",
        "nation": "usa",
        "tier": 1
    },
    "113": {
        "name": "Vindicator Ultramarines",
        "nation": "other",
        "tier": 7
    },
    "257": {
        "name": "SU-85",
        "nation": "ussr",
        "tier": 5
    },
    "289": {
        "name": "M3 Stuart",
        "nation": "usa",
        "tier": 2
    },
    "321": {
        "name": "D2",
        "nation": "france",
        "tier": 3
    },
    "337": {
        "name": "Vickers Medium Mk. II",
        "nation": "uk",
        "tier": 2
    },
    "353": {
        "name": "Chi-Ni",
        "nation": "japan",
        "tier": 2
    },
    "385": {
        "name": "Progetto M40 mod. 65",
        "nation": "european",
        "tier": 10
    },
    "513": {
        "name": "IS",
        "nation": "ussr",
        "tier": 7
    },
    "529": {
        "name": "Tiger I",
        "nation": "germany",
        "tier": 7
    },
    "545": {
        "name": "T1",
        "nation": "usa",
        "tier": 1
    },
    "577": {
        "name": "FT",
        "nation": "france",
        "tier": 1
    },
    "593": {
        "name": "Sherman Firefly",
        "nation": "uk",
        "tier": 6
    },
    "609": {
        "name": "R. Otsu",
        "nation": "japan",
        "tier": 1
    },
    "625": {
        "name": "Stridsvagn 74A2",
        "nation": "other",
        "tier": 6
    },
    "641": {
        "name": "Prototipo Standard B",
        "nation": "european",
        "tier": 9
    },
    "769": {
        "name": "BT-7",
        "nation": "ussr",
        "tier": 3
    },
    "785": {
        "name": "Pz.Kpfw. 35 (t)",
        "nation": "germany",
        "tier": 2
    },
    "801": {
        "name": "M6",
        "nation": "usa",
        "tier": 6
    },
    "817": {
        "name": "WZ-111",
        "nation": "china",
        "tier": 8
    },
    "849": {
        "name": "Matilda",
        "nation": "uk",
        "tier": 4
    },
    "865": {
        "name": "Type 95 Ha-Go",
        "nation": "japan",
        "tier": 1
    },
    "881": {
        "name": "Edelweiss",
        "nation": "other",
        "tier": 7
    },
    "897": {
        "name": "P.44 Pantera",
        "nation": "european",
        "tier": 8
    },
    "1025": {
        "name": "BT-2",
        "nation": "ussr",
        "tier": 2
    },
    "1041": {
        "name": "StuG III Ausf. G",
        "nation": "germany",
        "tier": 5
    },
    "1057": {
        "name": "M4 Sherman",
        "nation": "usa",
        "tier": 5
    },
    "1073": {
        "name": "T-34-1",
        "nation": "china",
        "tier": 7
    },
    "1089": {
        "name": "B1",
        "nation": "france",
        "tier": 4
    },
    "1105": {
        "name": "Cromwell",
        "nation": "uk",
        "tier": 6
    },
    "1121": {
        "name": "Type 5 Chi-Ri",
        "nation": "japan",
        "tier": 7
    },
    "1137": {
        "name": "Predator Ultramarines",
        "nation": "other",
        "tier": 7
    },
    "1153": {
        "name": "P.43 ter",
        "nation": "european",
        "tier": 7
    },
    "1297": {
        "name": "Panther I",
        "nation": "germany",
        "tier": 7
    },
    "1313": {
        "name": "M4A3E8 Sherman",
        "nation": "usa",
        "tier": 6
    },
    "1329": {
        "name": "NC-31",
        "nation": "china",
        "tier": 1
    },
    "1361": {
        "name": "Churchill Mk. VI",
        "nation": "uk",
        "tier": 6
    },
    "1377": {
        "name": "Type 3 Chi-Nu",
        "nation": "japan",
        "tier": 5
    },
    "1393": {
        "name": "Nameless",
        "nation": "other",
        "tier": 7
    },
    "1409": {
        "name": "P.43 bis",
        "nation": "european",
        "tier": 6
    },
    "1537": {
        "name": "T-28 mod. 1940",
        "nation": "ussr",
        "tier": 4
    },
    "1553": {
        "name": "Jagdpanzer IV",
        "nation": "germany",
        "tier": 6
    },
    "1569": {
        "name": "T20",
        "nation": "usa",
        "tier": 7
    },
    "1585": {
        "name": "T-34-2",
        "nation": "china",
        "tier": 8
    },
    "1601": {
        "name": "D1",
        "nation": "france",
        "tier": 2
    },
    "1617": {
        "name": "Sherman V",
        "nation": "uk",
        "tier": 5
    },
    "1633": {
        "name": "Type 1 Chi-He",
        "nation": "japan",
        "tier": 4
    },
    "1649": {
        "name": "Helsing",
        "nation": "other",
        "tier": 7
    },
    "1665": {
        "name": "Lago",
        "nation": "european",
        "tier": 4
    },
    "1809": {
        "name": "Hetzer",
        "nation": "germany",
        "tier": 4
    },
    "1825": {
        "name": "M2 Light Tank",
        "nation": "usa",
        "tier": 1
    },
    "1841": {
        "name": "WZ-120",
        "nation": "china",
        "tier": 9
    },
    "1857": {
        "name": "Bat.-Châtillon 25 t AP",
        "nation": "france",
        "tier": 9
    },
    "1889": {
        "name": "Type 4 Chi-To",
        "nation": "japan",
        "tier": 6
    },
    "1905": {
        "name": "O-47",
        "nation": "other",
        "tier": 8
    },
    "1921": {
        "name": "Strv m/42",
        "nation": "european",
        "tier": 5
    },
    "2049": {
        "name": "A-20",
        "nation": "ussr",
        "tier": 4
    },
    "2065": {
        "name": "Pz.Kpfw. II",
        "nation": "germany",
        "tier": 1
    },
    "2097": {
        "name": "WZ-111 model 1-4",
        "nation": "china",
        "tier": 9
    },
    "2129": {
        "name": "Crusader",
        "nation": "uk",
        "tier": 5
    },
    "2145": {
        "name": "Type 97 Chi-Ha",
        "nation": "japan",
        "tier": 3
    },
    "2161": {
        "name": "WZ 135G FT Blaze",
        "nation": "other",
        "tier": 7
    },
    "2177": {
        "name": "14TP",
        "nation": "european",
        "tier": 3
    },
    "2305": {
        "name": "SU-152",
        "nation": "ussr",
        "tier": 7
    },
    "2321": {
        "name": "VK 36.01 (H)",
        "nation": "germany",
        "tier": 6
    },
    "2353": {
        "name": "Vickers Mk. E Type B",
        "nation": "china",
        "tier": 1
    },
    "2369": {
        "name": "FCM 36 Pak 40",
        "nation": "france",
        "tier": 3
    },
    "2385": {
        "name": "Vickers Medium Mk. III",
        "nation": "uk",
        "tier": 3
    },
    "2401": {
        "name": "Type 98 Ke-Ni",
        "nation": "japan",
        "tier": 3
    },
    "2433": {
        "name": "10TP",
        "nation": "european",
        "tier": 2
    },
    "2561": {
        "name": "T-34-85",
        "nation": "ussr",
        "tier": 6
    },
    "2577": {
        "name": "VK 30.01 (H)",
        "nation": "germany",
        "tier": 5
    },
    "2593": {
        "name": "T30",
        "nation": "usa",
        "tier": 9
    },
    "2609": {
        "name": "Type 64",
        "nation": "china",
        "tier": 6
    },
    "2625": {
        "name": "ARL 44",
        "nation": "france",
        "tier": 6
    },
    "2657": {
        "name": "STA-1",
        "nation": "japan",
        "tier": 8
    },
    "2689": {
        "name": "Vickers Mk. F",
        "nation": "european",
        "tier": 1
    },
    "2817": {
        "name": "KV-1S",
        "nation": "ussr",
        "tier": 6
    },
    "2849": {
        "name": "T34",
        "nation": "usa",
        "tier": 8
    },
    "2865": {
        "name": "WZ-110",
        "nation": "china",
        "tier": 8
    },
    "2881": {
        "name": "AMX 40",
        "nation": "france",
        "tier": 4
    },
    "2897": {
        "name": "Churchill I",
        "nation": "uk",
        "tier": 5
    },
    "2913": {
        "name": "Type 5 Ke-Ho",
        "nation": "japan",
        "tier": 4
    },
    "2945": {
        "name": "Progetto M35 mod. 46",
        "nation": "european",
        "tier": 8
    },
    "3073": {
        "name": "T-46",
        "nation": "ussr",
        "tier": 3
    },
    "3089": {
        "name": "L.Tr.",
        "nation": "germany",
        "tier": 0
    },
    "3105": {
        "name": "M3 Lee",
        "nation": "usa",
        "tier": 4
    },
    "3121": {
        "name": "M5A1 Stuart",
        "nation": "china",
        "tier": 4
    },
    "3137": {
        "name": "AMX 50 100",
        "nation": "france",
        "tier": 8
    },
    "3153": {
        "name": "Black Prince",
        "nation": "uk",
        "tier": 7
    },
    "3201": {
        "name": "50TP prototyp",
        "nation": "european",
        "tier": 9
    },
    "3329": {
        "name": "MS-1 mod. 1",
        "nation": "ussr",
        "tier": 1
    },
    "3345": {
        "name": "Pz.Kpfw. 38 (t)",
        "nation": "germany",
        "tier": 3
    },
    "3361": {
        "name": "T1 Heavy Tank",
        "nation": "usa",
        "tier": 5
    },
    "3377": {
        "name": "WZ-131",
        "nation": "china",
        "tier": 7
    },
    "3425": {
        "name": "Type 61",
        "nation": "japan",
        "tier": 9
    },
    "3457": {
        "name": "Emil I",
        "nation": "european",
        "tier": 8
    },
    "3585": {
        "name": "SU-100",
        "nation": "ussr",
        "tier": 6
    },
    "3601": {
        "name": "Panzerjäger I",
        "nation": "germany",
        "tier": 2
    },
    "3633": {
        "name": "IS-2",
        "nation": "china",
        "tier": 7
    },
    "3649": {
        "name": "Bat.-Châtillon 25 t",
        "nation": "france",
        "tier": 10
    },
    "3681": {
        "name": "STB-1",
        "nation": "japan",
        "tier": 10
    },
    "3697": {
        "name": "Lupus",
        "nation": "other",
        "tier": 7
    },
    "3713": {
        "name": "Strv 74",
        "nation": "european",
        "tier": 6
    },
    "3857": {
        "name": "Jagdpanther",
        "nation": "germany",
        "tier": 7
    },
    "3873": {
        "name": "T29",
        "nation": "usa",
        "tier": 7
    },
    "3889": {
        "name": "WZ-132",
        "nation": "china",
        "tier": 8
    },
    "3905": {
        "name": "AMX 50 120",
        "nation": "france",
        "tier": 9
    },
    "3921": {
        "name": "Caernarvon",
        "nation": "uk",
        "tier": 8
    },
    "3937": {
        "name": "Ho-Ri Type III",
        "nation": "japan",
        "tier": 10
    },
    "3953": {
        "name": "T 55A",
        "nation": "other",
        "tier": 9
    },
    "3969": {
        "name": "Leo",
        "nation": "european",
        "tier": 7
    },
    "4113": {
        "name": "VK 30.02 (D)",
        "nation": "germany",
        "tier": 7
    },
    "4145": {
        "name": "WZ-121",
        "nation": "china",
        "tier": 10
    },
    "4193": {
        "name": "Ho-Ri Type II",
        "nation": "japan",
        "tier": 9
    },
    "4209": {
        "name": "WarDuck",
        "nation": "other",
        "tier": 1
    },
    "4225": {
        "name": "Emil II",
        "nation": "european",
        "tier": 9
    },
    "4353": {
        "name": "T-44",
        "nation": "ussr",
        "tier": 8
    },
    "4369": {
        "name": "Pz.Kpfw. III",
        "nation": "germany",
        "tier": 3
    },
    "4385": {
        "name": "T32",
        "nation": "usa",
        "tier": 8
    },
    "4401": {
        "name": "Type 2597 Chi-Ha",
        "nation": "china",
        "tier": 3
    },
    "4417": {
        "name": "AMX M4 mle. 54",
        "nation": "france",
        "tier": 10
    },
    "4433": {
        "name": "Conqueror",
        "nation": "uk",
        "tier": 9
    },
    "4449": {
        "name": "IS-2 Pravda SP",
        "nation": "japan",
        "tier": 7
    },
    "4465": {
        "name": "Hafen",
        "nation": "other",
        "tier": 7
    },
    "4481": {
        "name": "Kranvagn",
        "nation": "european",
        "tier": 10
    },
    "4609": {
        "name": "T-26",
        "nation": "ussr",
        "tier": 1
    },
    "4657": {
        "name": "Type T-34",
        "nation": "china",
        "tier": 5
    },
    "4689": {
        "name": "Churchill VII",
        "nation": "uk",
        "tier": 6
    },
    "4705": {
        "name": "Firefly Saunders SP",
        "nation": "japan",
        "tier": 6
    },
    "4721": {
        "name": "Gravedigger",
        "nation": "other",
        "tier": 7
    },
    "4737": {
        "name": "EMIL 1951",
        "nation": "european",
        "tier": 8
    },
    "4881": {
        "name": "Pz.Kpfw. III Ausf. A",
        "nation": "germany",
        "tier": 3
    },
    "4897": {
        "name": "M2 Medium Tank",
        "nation": "usa",
        "tier": 3
    },
    "4913": {
        "name": "59-16",
        "nation": "china",
        "tier": 6
    },
    "4929": {
        "name": "AMX 13 90",
        "nation": "france",
        "tier": 8
    },
    "4945": {
        "name": "Valentine Mk. IX",
        "nation": "uk",
        "tier": 4
    },
    "4961": {
        "name": "Ho-Ri Type I",
        "nation": "japan",
        "tier": 8
    },
    "4977": {
        "name": "Scavenger",
        "nation": "other",
        "tier": 5
    },
    "4993": {
        "name": "P.43/06 anniversario",
        "nation": "european",
        "tier": 6
    },
    "5121": {
        "name": "AT-1",
        "nation": "ussr",
        "tier": 2
    },
    "5137": {
        "name": "Tiger II",
        "nation": "germany",
        "tier": 8
    },
    "5153": {
        "name": "M5 Stuart",
        "nation": "usa",
        "tier": 3
    },
    "5169": {
        "name": "Type 58",
        "nation": "china",
        "tier": 6
    },
    "5185": {
        "name": "AMX 13 75",
        "nation": "france",
        "tier": 7
    },
    "5201": {
        "name": "Cruiser Mk. I",
        "nation": "uk",
        "tier": 2
    },
    "5217": {
        "name": "Chi-To SPG",
        "nation": "japan",
        "tier": 7
    },
    "5233": {
        "name": "Smasher",
        "nation": "other",
        "tier": 7
    },
    "5249": {
        "name": "Pudel",
        "nation": "european",
        "tier": 6
    },
    "5377": {
        "name": "IS-3",
        "nation": "ussr",
        "tier": 8
    },
    "5393": {
        "name": "VK 16.02 Leopard",
        "nation": "germany",
        "tier": 5
    },
    "5409": {
        "name": "M7",
        "nation": "usa",
        "tier": 4
    },
    "5425": {
        "name": "WZ-113",
        "nation": "china",
        "tier": 10
    },
    "5441": {
        "name": "AMX 30 1er prototype",
        "nation": "france",
        "tier": 9
    },
    "5457": {
        "name": "Comet",
        "nation": "uk",
        "tier": 7
    },
    "5473": {
        "name": "Mitsu 108",
        "nation": "japan",
        "tier": 5
    },
    "5489": {
        "name": "Y5 T-34",
        "nation": "other",
        "tier": 5
    },
    "5505": {
        "name": "TVP T 50/51",
        "nation": "european",
        "tier": 10
    },
    "5665": {
        "name": "T2 Medium Tank",
        "nation": "usa",
        "tier": 2
    },
    "5681": {
        "name": "121B",
        "nation": "china",
        "tier": 10
    },
    "5713": {
        "name": "Centurion Mk. 7/1",
        "nation": "uk",
        "tier": 9
    },
    "5729": {
        "name": "Ju-Nu",
        "nation": "japan",
        "tier": 6
    },
    "5745": {
        "name": "Y5 Firefly",
        "nation": "other",
        "tier": 6
    },
    "5761": {
        "name": "Škoda T 50",
        "nation": "european",
        "tier": 9
    },
    "5889": {
        "name": "KV-3",
        "nation": "ussr",
        "tier": 7
    },
    "5921": {
        "name": "M26 Pershing",
        "nation": "usa",
        "tier": 8
    },
    "5937": {
        "name": "59-Patton",
        "nation": "china",
        "tier": 8
    },
    "5953": {
        "name": "AMX 38",
        "nation": "france",
        "tier": 2
    },
    "5969": {
        "name": "Centurion Mk. I",
        "nation": "uk",
        "tier": 8
    },
    "5985": {
        "name": "Ju-To",
        "nation": "japan",
        "tier": 7
    },
    "6001": {
        "name": "Y5 ELC bis",
        "nation": "other",
        "tier": 7
    },
    "6017": {
        "name": "TVP VTU Koncept",
        "nation": "european",
        "tier": 8
    },
    "6145": {
        "name": "IS-4",
        "nation": "ussr",
        "tier": 10
    },
    "6161": {
        "name": "Pz.Kpfw. II Luchs",
        "nation": "germany",
        "tier": 4
    },
    "6177": {
        "name": "T18",
        "nation": "usa",
        "tier": 2
    },
    "6193": {
        "name": "T-34-3",
        "nation": "china",
        "tier": 8
    },
    "6209": {
        "name": "AMX 50 B",
        "nation": "france",
        "tier": 10
    },
    "6225": {
        "name": "FV215b",
        "nation": "uk",
        "tier": 10
    },
    "6241": {
        "name": "Chi-Se",
        "nation": "japan",
        "tier": 8
    },
    "6257": {
        "name": "M4/FL10",
        "nation": "other",
        "tier": 7
    },
    "6273": {
        "name": "Konštrukta T-34/100",
        "nation": "european",
        "tier": 7
    },
    "6401": {
        "name": "SU-76",
        "nation": "ussr",
        "tier": 3
    },
    "6417": {
        "name": "Pz.Kpfw. III/IV",
        "nation": "germany",
        "tier": 5
    },
    "6433": {
        "name": "T82",
        "nation": "usa",
        "tier": 3
    },
    "6449": {
        "name": "WZ-113G FT",
        "nation": "china",
        "tier": 10
    },
    "6465": {
        "name": "AMX 12 t",
        "nation": "france",
        "tier": 6
    },
    "6481": {
        "name": "Covenanter",
        "nation": "uk",
        "tier": 4
    },
    "6497": {
        "name": "Type 68",
        "nation": "japan",
        "tier": 9
    },
    "6529": {
        "name": "Škoda T 25",
        "nation": "european",
        "tier": 6
    },
    "6657": {
        "name": "T-43",
        "nation": "ussr",
        "tier": 7
    },
    "6673": {
        "name": "Marder II",
        "nation": "germany",
        "tier": 3
    },
    "6689": {
        "name": "T49 ATM",
        "nation": "usa",
        "tier": 7
    },
    "6705": {
        "name": "LT vz. 38",
        "nation": "china",
        "tier": 2
    },
    "6721": {
        "name": "BDR G1 B",
        "nation": "france",
        "tier": 5
    },
    "6753": {
        "name": "Type 71",
        "nation": "japan",
        "tier": 10
    },
    "6785": {
        "name": "Škoda T 27",
        "nation": "european",
        "tier": 8
    },
    "6913": {
        "name": "SU-85B",
        "nation": "ussr",
        "tier": 4
    },
    "6929": {
        "name": "Maus",
        "nation": "germany",
        "tier": 10
    },
    "6945": {
        "name": "M10 Wolverine",
        "nation": "usa",
        "tier": 5
    },
    "6961": {
        "name": "WZ-120-1G FT",
        "nation": "china",
        "tier": 8
    },
    "6977": {
        "name": "AMX M4 mle. 45",
        "nation": "france",
        "tier": 7
    },
    "6993": {
        "name": "Cruiser Mk. II",
        "nation": "uk",
        "tier": 1
    },
    "7009": {
        "name": "Type 57",
        "nation": "japan",
        "tier": 8
    },
    "7025": {
        "name": "Vulcan",
        "nation": "other",
        "tier": 7
    },
    "7041": {
        "name": "Turbo",
        "nation": "european",
        "tier": 6
    },
    "7169": {
        "name": "IS-7",
        "nation": "ussr",
        "tier": 10
    },
    "7185": {
        "name": "VK 30.01 (P)",
        "nation": "germany",
        "tier": 6
    },
    "7201": {
        "name": "M36 Jackson",
        "nation": "usa",
        "tier": 6
    },
    "7217": {
        "name": "WZ-112-2",
        "nation": "china",
        "tier": 8
    },
    "7249": {
        "name": "FV4202",
        "nation": "uk",
        "tier": 10
    },
    "7265": {
        "name": "Ferrum",
        "nation": "japan",
        "tier": 6
    },
    "7281": {
        "name": "Lycan",
        "nation": "other",
        "tier": 7
    },
    "7297": {
        "name": "60TP Lewandowskiego",
        "nation": "european",
        "tier": 10
    },
    "7425": {
        "name": "ISU-152",
        "nation": "ussr",
        "tier": 8
    },
    "7441": {
        "name": "VK 45.02 (P) Ausf. B",
        "nation": "germany",
        "tier": 9
    },
    "7473": {
        "name": "T-34-2G FT",
        "nation": "china",
        "tier": 7
    },
    "7505": {
        "name": "Cruiser Mk. IV",
        "nation": "uk",
        "tier": 3
    },
    "7521": {
        "name": "Type 5 Ka-Ri",
        "nation": "japan",
        "tier": 8
    },
    "7537": {
        "name": "Nightmare",
        "nation": "other",
        "tier": 5
    },
    "7553": {
        "name": "50TP Tyszkiewicza",
        "nation": "european",
        "tier": 9
    },
    "7697": {
        "name": "Ferdinand",
        "nation": "germany",
        "tier": 8
    },
    "7713": {
        "name": "T40",
        "nation": "usa",
        "tier": 4
    },
    "7729": {
        "name": "WZ-131G FT",
        "nation": "china",
        "tier": 6
    },
    "7745": {
        "name": "Renault FT AC",
        "nation": "france",
        "tier": 2
    },
    "7761": {
        "name": "Cruiser Mk. III",
        "nation": "uk",
        "tier": 2
    },
    "7777": {
        "name": "type 63",
        "nation": "japan",
        "tier": 8
    },
    "7793": {
        "name": "Annihilator",
        "nation": "other",
        "tier": 7
    },
    "7809": {
        "name": "53TP Markowskiego",
        "nation": "european",
        "tier": 8
    },
    "7937": {
        "name": "T-54",
        "nation": "ussr",
        "tier": 9
    },
    "7953": {
        "name": "Jagdtiger",
        "nation": "germany",
        "tier": 9
    },
    "7985": {
        "name": "WZ-111-1G FT",
        "nation": "china",
        "tier": 8
    },
    "8001": {
        "name": "Lorraine 40 t",
        "nation": "france",
        "tier": 8
    },
    "8017": {
        "name": "Valentine AT",
        "nation": "uk",
        "tier": 3
    },
    "8033": {
        "name": "Type 5 Heavy",
        "nation": "japan",
        "tier": 10
    },
    "8049": {
        "name": "Spike",
        "nation": "other",
        "tier": 5
    },
    "8065": {
        "name": "40TP Habicha",
        "nation": "european",
        "tier": 6
    },
    "8193": {
        "name": "Object 704",
        "nation": "ussr",
        "tier": 9
    },
    "8209": {
        "name": "Pz.Kpfw. 38 (t) n.A.",
        "nation": "germany",
        "tier": 4
    },
    "8225": {
        "name": "T28",
        "nation": "usa",
        "tier": 8
    },
    "8241": {
        "name": "WZ-111G FT",
        "nation": "china",
        "tier": 9
    },
    "8257": {
        "name": "Renault UE 57",
        "nation": "france",
        "tier": 3
    },
    "8273": {
        "name": "Universal Carrier 2-pdr",
        "nation": "uk",
        "tier": 2
    },
    "8305": {
        "name": "Titan H-Nd",
        "nation": "other",
        "tier": 7
    },
    "8321": {
        "name": "45TP Habicha",
        "nation": "european",
        "tier": 7
    },
    "8465": {
        "name": "Panther II",
        "nation": "germany",
        "tier": 8
    },
    "8497": {
        "name": "WZ-111 model 5A",
        "nation": "china",
        "tier": 10
    },
    "8513": {
        "name": "AMX 30 B",
        "nation": "france",
        "tier": 10
    },
    "8529": {
        "name": "AT 15",
        "nation": "uk",
        "tier": 8
    },
    "8561": {
        "name": "Titan T24 57",
        "nation": "other",
        "tier": 6
    },
    "8577": {
        "name": "Lansen C",
        "nation": "european",
        "tier": 8
    },
    "8737": {
        "name": "T95",
        "nation": "usa",
        "tier": 9
    },
    "8753": {
        "name": "M41D",
        "nation": "china",
        "tier": 7
    },
    "8785": {
        "name": "AT 2",
        "nation": "uk",
        "tier": 5
    },
    "8817": {
        "name": "Titan Mk. I",
        "nation": "other",
        "tier": 5
    },
    "8833": {
        "name": "Spark",
        "nation": "european",
        "tier": 6
    },
    "8961": {
        "name": "KV-13",
        "nation": "ussr",
        "tier": 7
    },
    "8993": {
        "name": "M46 Patton",
        "nation": "usa",
        "tier": 9
    },
    "9009": {
        "name": "Ox",
        "nation": "china",
        "tier": 6
    },
    "9041": {
        "name": "Alecto",
        "nation": "uk",
        "tier": 4
    },
    "9073": {
        "name": "Titan-54d",
        "nation": "other",
        "tier": 8
    },
    "9089": {
        "name": "Škoda T 56",
        "nation": "european",
        "tier": 8
    },
    "9217": {
        "name": "IS-6",
        "nation": "ussr",
        "tier": 8
    },
    "9249": {
        "name": "T25 AT",
        "nation": "usa",
        "tier": 7
    },
    "9297": {
        "name": "FV215b (183)",
        "nation": "uk",
        "tier": 10
    },
    "9329": {
        "name": "Titan-150",
        "nation": "other",
        "tier": 6
    },
    "9345": {
        "name": "Svear",
        "nation": "european",
        "tier": 7
    },
    "9489": {
        "name": "E 100",
        "nation": "germany",
        "tier": 10
    },
    "9505": {
        "name": "M103",
        "nation": "usa",
        "tier": 9
    },
    "9521": {
        "name": "WZ-122 TM",
        "nation": "china",
        "tier": 8
    },
    "9553": {
        "name": "AT 8",
        "nation": "uk",
        "tier": 6
    },
    "9601": {
        "name": "CS-52 LIS",
        "nation": "european",
        "tier": 7
    },
    "9745": {
        "name": "E 75",
        "nation": "germany",
        "tier": 9
    },
    "9761": {
        "name": "M24 Chaffee",
        "nation": "usa",
        "tier": 6
    },
    "9777": {
        "name": "WZ-114",
        "nation": "china",
        "tier": 9
    },
    "9793": {
        "name": "Somua SAu 40",
        "nation": "france",
        "tier": 4
    },
    "9809": {
        "name": "Churchill Gun Carrier",
        "nation": "uk",
        "tier": 6
    },
    "9841": {
        "name": "Rover",
        "nation": "other",
        "tier": 6
    },
    "9857": {
        "name": "Škoda T 45",
        "nation": "european",
        "tier": 7
    },
    "9985": {
        "name": "SU-101",
        "nation": "ussr",
        "tier": 8
    },
    "10001": {
        "name": "VK 28.01",
        "nation": "germany",
        "tier": 6
    },
    "10017": {
        "name": "M4A3E2 Sherman Jumbo",
        "nation": "usa",
        "tier": 6
    },
    "10033": {
        "name": "WZ-132A",
        "nation": "china",
        "tier": 9
    },
    "10049": {
        "name": "S35 CA",
        "nation": "france",
        "tier": 5
    },
    "10065": {
        "name": "AT 7",
        "nation": "uk",
        "tier": 7
    },
    "10097": {
        "name": "Medjay",
        "nation": "other",
        "tier": 5
    },
    "10113": {
        "name": "Carro da Combattimento 45t",
        "nation": "european",
        "tier": 10
    },
    "10241": {
        "name": "SU-100M1",
        "nation": "ussr",
        "tier": 7
    },
    "10257": {
        "name": "E 50",
        "nation": "germany",
        "tier": 9
    },
    "10273": {
        "name": "M8A1",
        "nation": "usa",
        "tier": 4
    },
    "10289": {
        "name": "Wz-132-1",
        "nation": "china",
        "tier": 10
    },
    "10353": {
        "name": "Pharaoh",
        "nation": "other",
        "tier": 7
    },
    "10369": {
        "name": "Controcarro 3 Minotauro",
        "nation": "european",
        "tier": 10
    },
    "10497": {
        "name": "KV-2",
        "nation": "ussr",
        "tier": 6
    },
    "10513": {
        "name": "VK 45.02 (P) Ausf. A",
        "nation": "germany",
        "tier": 8
    },
    "10529": {
        "name": "T67",
        "nation": "usa",
        "tier": 5
    },
    "10545": {
        "name": "Wind",
        "nation": "china",
        "tier": 6
    },
    "10609": {
        "name": "Magnate",
        "nation": "other",
        "tier": 7
    },
    "10625": {
        "name": "Controcarro 1 Mk. 2",
        "nation": "european",
        "tier": 9
    },
    "10753": {
        "name": "ST-I",
        "nation": "ussr",
        "tier": 9
    },
    "10769": {
        "name": "Tiger (P)",
        "nation": "germany",
        "tier": 7
    },
    "10785": {
        "name": "T110E5",
        "nation": "usa",
        "tier": 10
    },
    "10801": {
        "name": "Panlong",
        "nation": "france",
        "tier": 6
    },
    "10817": {
        "name": "AMX AC mle. 46",
        "nation": "france",
        "tier": 7
    },
    "10865": {
        "name": "Fixer",
        "nation": "other",
        "tier": 8
    },
    "10881": {
        "name": "Semovente Controcarro mod. 1964",
        "nation": "european",
        "tier": 8
    },
    "11009": {
        "name": "KV-4",
        "nation": "ussr",
        "tier": 8
    },
    "11025": {
        "name": "Sturer Emil",
        "nation": "germany",
        "tier": 7
    },
    "11041": {
        "name": "T25/2",
        "nation": "usa",
        "tier": 7
    },
    "11057": {
        "name": "114 SP2",
        "nation": "china",
        "tier": 10
    },
    "11073": {
        "name": "AMX 50 Foch",
        "nation": "france",
        "tier": 9
    },
    "11121": {
        "name": "Regressor",
        "nation": "other",
        "tier": 9
    },
    "11137": {
        "name": "Semovente Controcarro mod. 1956",
        "nation": "european",
        "tier": 7
    },
    "11265": {
        "name": "T-150",
        "nation": "ussr",
        "tier": 6
    },
    "11281": {
        "name": "Kampfpanzer 70",
        "nation": "germany",
        "tier": 9
    },
    "11297": {
        "name": "T28 Prototype",
        "nation": "usa",
        "tier": 8
    },
    "11313": {
        "name": "Type 58 (tutorial)",
        "nation": "china",
        "tier": 7
    },
    "11377": {
        "name": "Basilisk",
        "nation": "other",
        "tier": 7
    },
    "11393": {
        "name": "Semovente M43 Bassotto",
        "nation": "european",
        "tier": 6
    },
    "11521": {
        "name": "IS-8",
        "nation": "ussr",
        "tier": 9
    },
    "11537": {
        "name": "Jagdpanther II",
        "nation": "germany",
        "tier": 8
    },
    "11553": {
        "name": "M18 Hellcat",
        "nation": "usa",
        "tier": 6
    },
    "11569": {
        "name": "BZ-58-2",
        "nation": "china",
        "tier": 9
    },
    "11585": {
        "name": "ARL V39",
        "nation": "france",
        "tier": 6
    },
    "11633": {
        "name": "Forest Witch",
        "nation": "other",
        "tier": 7
    },
    "11649": {
        "name": "Semovente M41",
        "nation": "european",
        "tier": 5
    },
    "11777": {
        "name": "KV-1",
        "nation": "ussr",
        "tier": 5
    },
    "11793": {
        "name": "Nashorn",
        "nation": "germany",
        "tier": 6
    },
    "11809": {
        "name": "T23E3",
        "nation": "usa",
        "tier": 7
    },
    "11825": {
        "name": "BZ-75",
        "nation": "china",
        "tier": 10
    },
    "11889": {
        "name": "Nebulon",
        "nation": "other",
        "tier": 8
    },
    "11905": {
        "name": "Shadowhunter",
        "nation": "european",
        "tier": 6
    },
    "12033": {
        "name": "SU-122-54",
        "nation": "ussr",
        "tier": 9
    },
    "12049": {
        "name": "Jagdpanzer E 100",
        "nation": "germany",
        "tier": 10
    },
    "12065": {
        "name": "T95E2",
        "nation": "usa",
        "tier": 8
    },
    "12081": {
        "name": "BZ-68",
        "nation": "china",
        "tier": 9
    },
    "12097": {
        "name": "AMX AC mle. 48",
        "nation": "france",
        "tier": 8
    },
    "12145": {
        "name": "Glacier",
        "nation": "other",
        "tier": 9
    },
    "12161": {
        "name": "Strv K",
        "nation": "european",
        "tier": 10
    },
    "12305": {
        "name": "E 50 Ausf. M",
        "nation": "germany",
        "tier": 10
    },
    "12321": {
        "name": "T6E1 Grizzly",
        "nation": "usa",
        "tier": 4
    },
    "12337": {
        "name": "BZ-58",
        "nation": "china",
        "tier": 7
    },
    "12417": {
        "name": "Bisonte C45",
        "nation": "european",
        "tier": 8
    },
    "12545": {
        "name": "K-91",
        "nation": "ussr",
        "tier": 9
    },
    "12593": {
        "name": "BZ-166",
        "nation": "china",
        "tier": 8
    },
    "12657": {
        "name": "Titan Charioteer",
        "nation": "other",
        "tier": 8
    },
    "12673": {
        "name": "Tornvagn",
        "nation": "european",
        "tier": 8
    },
    "12849": {
        "name": "116-F3",
        "nation": "china",
        "tier": 10
    },
    "12913": {
        "name": "Groundtank",
        "nation": "other",
        "tier": 8
    },
    "12929": {
        "name": "TNH T Vz. 51",
        "nation": "european",
        "tier": 9
    },
    "13073": {
        "name": "Pz.Kpfw. II Ausf. G",
        "nation": "germany",
        "tier": 3
    },
    "13089": {
        "name": "T110E4",
        "nation": "usa",
        "tier": 10
    },
    "13105": {
        "name": "BZ-176",
        "nation": "china",
        "tier": 9
    },
    "13185": {
        "name": "Vz. 55",
        "nation": "european",
        "tier": 10
    },
    "13329": {
        "name": "Durchbruchswagen 2",
        "nation": "germany",
        "tier": 4
    },
    "13345": {
        "name": "T26E4 SuperPershing",
        "nation": "usa",
        "tier": 8
    },
    "13441": {
        "name": "Aeonix",
        "nation": "european",
        "tier": 6
    },
    "13569": {
        "name": "Object 268",
        "nation": "ussr",
        "tier": 10
    },
    "13617": {
        "name": "Type 59 spc",
        "nation": "china",
        "tier": 8
    },
    "13697": {
        "name": "TNH 105/1000",
        "nation": "european",
        "tier": 8
    },
    "13825": {
        "name": "T-62A",
        "nation": "ussr",
        "tier": 10
    },
    "13841": {
        "name": "Indien-Panzer",
        "nation": "germany",
        "tier": 8
    },
    "13857": {
        "name": "T110E3",
        "nation": "usa",
        "tier": 10
    },
    "13873": {
        "name": "BZ-74-1",
        "nation": "china",
        "tier": 9
    },
    "13889": {
        "name": "AMX 50 Foch (155)",
        "nation": "france",
        "tier": 10
    },
    "13953": {
        "name": "Vz. 44-1",
        "nation": "european",
        "tier": 7
    },
    "14097": {
        "name": "VK 30.01 (D)",
        "nation": "germany",
        "tier": 6
    },
    "14113": {
        "name": "M48 Patton",
        "nation": "usa",
        "tier": 10
    },
    "14129": {
        "name": "BZT-70",
        "nation": "china",
        "tier": 10
    },
    "14145": {
        "name": "AMX ELC bis",
        "nation": "france",
        "tier": 5
    },
    "14193": {
        "name": "Silencer",
        "nation": "other",
        "tier": 7
    },
    "14209": {
        "name": "Škoda P-JS",
        "nation": "european",
        "tier": 6
    },
    "14337": {
        "name": "Object 263",
        "nation": "ussr",
        "tier": 10
    },
    "14449": {
        "name": "Swindler",
        "nation": "other",
        "tier": 8
    },
    "14465": {
        "name": "DS PZlnż",
        "nation": "european",
        "tier": 5
    },
    "14609": {
        "name": "Leopard 1",
        "nation": "germany",
        "tier": 10
    },
    "14625": {
        "name": "T69",
        "nation": "usa",
        "tier": 8
    },
    "14705": {
        "name": "Fänrik",
        "nation": "other",
        "tier": 9
    },
    "14721": {
        "name": "Strv 81",
        "nation": "european",
        "tier": 8
    },
    "14865": {
        "name": "Leopard Prototyp A",
        "nation": "germany",
        "tier": 9
    },
    "14881": {
        "name": "T57 Heavy Tank",
        "nation": "usa",
        "tier": 10
    },
    "14961": {
        "name": "Mutant",
        "nation": "other",
        "tier": 7
    },
    "14977": {
        "name": "CS-63",
        "nation": "european",
        "tier": 10
    },
    "15137": {
        "name": "T21",
        "nation": "usa",
        "tier": 6
    },
    "15233": {
        "name": "CS-59",
        "nation": "european",
        "tier": 9
    },
    "15393": {
        "name": "T54E1",
        "nation": "usa",
        "tier": 9
    },
    "15441": {
        "name": "Chieftain/T95",
        "nation": "uk",
        "tier": 8
    },
    "15473": {
        "name": "Endurance",
        "nation": "other",
        "tier": 7
    },
    "15489": {
        "name": "CS-53",
        "nation": "european",
        "tier": 8
    },
    "15617": {
        "name": "Object 907",
        "nation": "ussr",
        "tier": 10
    },
    "15649": {
        "name": "T71",
        "nation": "usa",
        "tier": 7
    },
    "15697": {
        "name": "Chieftain Mk. 6",
        "nation": "uk",
        "tier": 10
    },
    "15729": {
        "name": "TSL-7 Defender",
        "nation": "other",
        "tier": 8
    },
    "15889": {
        "name": "VK 30.02 (M)",
        "nation": "germany",
        "tier": 6
    },
    "15905": {
        "name": "M60",
        "nation": "usa",
        "tier": 10
    },
    "15937": {
        "name": "Renault R35",
        "nation": "france",
        "tier": 1
    },
    "15953": {
        "name": "FV201 (A45)",
        "nation": "uk",
        "tier": 7
    },
    "15985": {
        "name": "Toxique",
        "nation": "other",
        "tier": 8
    },
    "16001": {
        "name": "B.U.G.I",
        "nation": "european",
        "tier": 6
    },
    "16145": {
        "name": "Pz.Sfl. IVc",
        "nation": "germany",
        "tier": 5
    },
    "16193": {
        "name": "M4A1 Revalorisé",
        "nation": "france",
        "tier": 8
    },
    "16241": {
        "name": "Rammer",
        "nation": "other",
        "tier": 7
    },
    "16257": {
        "name": "Outcast",
        "nation": "other",
        "tier": 6
    },
    "16401": {
        "name": "Waffenträger auf Pz. IV",
        "nation": "germany",
        "tier": 9
    },
    "16449": {
        "name": "AMX 13 57",
        "nation": "france",
        "tier": 7
    },
    "16497": {
        "name": "E-10",
        "nation": "other",
        "tier": 7
    },
    "16513": {
        "name": "ShPTK-TVP 100",
        "nation": "european",
        "tier": 8
    },
    "16641": {
        "name": "MT-25",
        "nation": "ussr",
        "tier": 6
    },
    "16657": {
        "name": "Rhm.-Borsig Waffenträger",
        "nation": "germany",
        "tier": 8
    },
    "16673": {
        "name": "T37",
        "nation": "usa",
        "tier": 6
    },
    "16705": {
        "name": "AMX M4 mle. 49",
        "nation": "france",
        "tier": 8
    },
    "16753": {
        "name": "DTH-STR",
        "nation": "other",
        "tier": 8
    },
    "16769": {
        "name": "SMV Vipera",
        "nation": "european",
        "tier": 8
    },
    "16897": {
        "name": "Object 140",
        "nation": "ussr",
        "tier": 10
    },
    "17009": {
        "name": "KV-JR",
        "nation": "other",
        "tier": 9
    },
    "17025": {
        "name": "progetto CC55 mod. 54",
        "nation": "european",
        "tier": 8
    },
    "17169": {
        "name": "Pz.Kpfw. IV Ausf. A",
        "nation": "germany",
        "tier": 3
    },
    "17217": {
        "name": "Eraser BP44",
        "nation": "france",
        "tier": 6
    },
    "17233": {
        "name": "FV4004 Conway",
        "nation": "uk",
        "tier": 9
    },
    "17265": {
        "name": "Souleater",
        "nation": "other",
        "tier": 8
    },
    "17281": {
        "name": "Progetto C50 mod. 66",
        "nation": "european",
        "tier": 9
    },
    "17425": {
        "name": "Pz.Kpfw. IV Ausf. D",
        "nation": "germany",
        "tier": 4
    },
    "17473": {
        "name": "AMX Defender",
        "nation": "france",
        "tier": 8
    },
    "17489": {
        "name": "Charioteer",
        "nation": "uk",
        "tier": 8
    },
    "17521": {
        "name": "Lightbringer",
        "nation": "other",
        "tier": 7
    },
    "17537": {
        "name": "Carro d'assalto P.88",
        "nation": "european",
        "tier": 7
    },
    "17729": {
        "name": "Somua SM",
        "nation": "france",
        "tier": 8
    },
    "17745": {
        "name": "FV217 Badger",
        "nation": "uk",
        "tier": 10
    },
    "17777": {
        "name": "Titan Strife",
        "nation": "other",
        "tier": 8
    },
    "17793": {
        "name": "Rinoceronte",
        "nation": "european",
        "tier": 10
    },
    "17953": {
        "name": "M41 Walker Bulldog",
        "nation": "usa",
        "tier": 7
    },
    "17985": {
        "name": "Bretagne Panther",
        "nation": "france",
        "tier": 6
    },
    "18001": {
        "name": "FV4005",
        "nation": "uk",
        "tier": 10
    },
    "18033": {
        "name": "Hazard I",
        "nation": "other",
        "tier": 7
    },
    "18049": {
        "name": "Lion",
        "nation": "european",
        "tier": 10
    },
    "18177": {
        "name": "T-54 ltwt.",
        "nation": "ussr",
        "tier": 8
    },
    "18209": {
        "name": "T49",
        "nation": "usa",
        "tier": 8
    },
    "18241": {
        "name": "B-C Bourrasque",
        "nation": "france",
        "tier": 8
    },
    "18257": {
        "name": "Challenger",
        "nation": "uk",
        "tier": 7
    },
    "18289": {
        "name": "Quetzal",
        "nation": "other",
        "tier": 8
    },
    "18433": {
        "name": "LTTB",
        "nation": "ussr",
        "tier": 7
    },
    "18449": {
        "name": "Ru 251",
        "nation": "germany",
        "tier": 8
    },
    "18497": {
        "name": "Lorraine 40 t Fearless",
        "nation": "france",
        "tier": 8
    },
    "18513": {
        "name": "Chimera",
        "nation": "uk",
        "tier": 8
    },
    "18545": {
        "name": "Argonaut",
        "nation": "other",
        "tier": 9
    },
    "18689": {
        "name": "T-70/57",
        "nation": "ussr",
        "tier": 3
    },
    "18753": {
        "name": "AMX Canon d'assaut 105",
        "nation": "france",
        "tier": 8
    },
    "18769": {
        "name": "Caernarvon Action X",
        "nation": "uk",
        "tier": 8
    },
    "18801": {
        "name": "mau5Tank",
        "nation": "other",
        "tier": 9
    },
    "18945": {
        "name": "ISU-130",
        "nation": "ussr",
        "tier": 8
    },
    "18961": {
        "name": "Spähpanzer SP I C",
        "nation": "germany",
        "tier": 7
    },
    "18977": {
        "name": "T95E6",
        "nation": "usa",
        "tier": 10
    },
    "19009": {
        "name": "AMXmas",
        "nation": "france",
        "tier": 6
    },
    "19025": {
        "name": "Defender Mk. 1",
        "nation": "uk",
        "tier": 8
    },
    "19057": {
        "name": "Destiny",
        "nation": "other",
        "tier": 9
    },
    "19217": {
        "name": "Grille 15",
        "nation": "germany",
        "tier": 10
    },
    "19233": {
        "name": "Chrysler K",
        "nation": "usa",
        "tier": 8
    },
    "19265": {
        "name": "Charles",
        "nation": "france",
        "tier": 6
    },
    "19281": {
        "name": "Super Conqueror",
        "nation": "uk",
        "tier": 10
    },
    "19313": {
        "name": "Prowler",
        "nation": "other",
        "tier": 8
    },
    "19473": {
        "name": "Krupp-38(D)",
        "nation": "germany",
        "tier": 5
    },
    "19489": {
        "name": "T28 Defender",
        "nation": "usa",
        "tier": 8
    },
    "19521": {
        "name": "B-C 25 t Avenir",
        "nation": "france",
        "tier": 9
    },
    "19537": {
        "name": "Vickers Light 105",
        "nation": "uk",
        "tier": 10
    },
    "19713": {
        "name": "Loza's M4-A2 Sherman",
        "nation": "ussr",
        "tier": 6
    },
    "19729": {
        "name": "Tiger 131",
        "nation": "germany",
        "tier": 6
    },
    "19745": {
        "name": "T26E5",
        "nation": "usa",
        "tier": 8
    },
    "19777": {
        "name": "A.P. AMX 30",
        "nation": "france",
        "tier": 8
    },
    "19793": {
        "name": "Vickers Cruiser",
        "nation": "uk",
        "tier": 9
    },
    "19969": {
        "name": "T-22 medium",
        "nation": "ussr",
        "tier": 10
    },
    "19985": {
        "name": "Skorpion G",
        "nation": "germany",
        "tier": 8
    },
    "20001": {
        "name": "T92E1",
        "nation": "usa",
        "tier": 9
    },
    "20033": {
        "name": "Char Futur 4",
        "nation": "france",
        "tier": 9
    },
    "20049": {
        "name": "FV301",
        "nation": "uk",
        "tier": 8
    },
    "20257": {
        "name": "XM551 Sheridan",
        "nation": "usa",
        "tier": 10
    },
    "20289": {
        "name": "Pirate",
        "nation": "france",
        "tier": 6
    },
    "20305": {
        "name": "Centurion Mk. 5/1 RAAC",
        "nation": "uk",
        "tier": 8
    },
    "20481": {
        "name": "Object 252U",
        "nation": "ussr",
        "tier": 8
    },
    "20497": {
        "name": "VK 100.01 (P)",
        "nation": "germany",
        "tier": 8
    },
    "20513": {
        "name": "T54E2",
        "nation": "usa",
        "tier": 8
    },
    "20561": {
        "name": "Turtle Mk. I",
        "nation": "uk",
        "tier": 8
    },
    "20737": {
        "name": "SU-130PM",
        "nation": "ussr",
        "tier": 8
    },
    "20753": {
        "name": "Mäuschen",
        "nation": "germany",
        "tier": 9
    },
    "20769": {
        "name": "T25 Pilot Number 1",
        "nation": "usa",
        "tier": 8
    },
    "20801": {
        "name": "Lorraine 50 t",
        "nation": "france",
        "tier": 9
    },
    "20817": {
        "name": "Explorer",
        "nation": "uk",
        "tier": 6
    },
    "20993": {
        "name": "T-2020",
        "nation": "ussr",
        "tier": 8
    },
    "21009": {
        "name": "Panzer 58",
        "nation": "germany",
        "tier": 8
    },
    "21025": {
        "name": "T26E3 Eagle 7",
        "nation": "usa",
        "tier": 7
    },
    "21057": {
        "name": "Projet Murat",
        "nation": "france",
        "tier": 10
    },
    "21073": {
        "name": "Dreadnought",
        "nation": "uk",
        "tier": 6
    },
    "21249": {
        "name": "Thunder",
        "nation": "ussr",
        "tier": 6
    },
    "21265": {
        "name": "VK 168.01 (P)",
        "nation": "germany",
        "tier": 8
    },
    "21281": {
        "name": "Rudolph",
        "nation": "usa",
        "tier": 6
    },
    "21313": {
        "name": "AMX 13 M24",
        "nation": "france",
        "tier": 7
    },
    "21329": {
        "name": "GSOR 1008",
        "nation": "uk",
        "tier": 8
    },
    "21505": {
        "name": "T-44-85",
        "nation": "ussr",
        "tier": 7
    },
    "21521": {
        "name": "E 75 TS",
        "nation": "germany",
        "tier": 8
    },
    "21569": {
        "name": "ERAC 105 Proto",
        "nation": "france",
        "tier": 8
    },
    "21585": {
        "name": "Blasteroid",
        "nation": "uk",
        "tier": 6
    },
    "21761": {
        "name": "STG",
        "nation": "ussr",
        "tier": 8
    },
    "21777": {
        "name": "VK 90.01 (P)",
        "nation": "germany",
        "tier": 10
    },
    "21793": {
        "name": "XM551 Sheridan Missile",
        "nation": "usa",
        "tier": 10
    },
    "21825": {
        "name": "Projet Louis",
        "nation": "france",
        "tier": 9
    },
    "21841": {
        "name": "Caliban",
        "nation": "uk",
        "tier": 8
    },
    "22033": {
        "name": "Agent",
        "nation": "germany",
        "tier": 6
    },
    "22049": {
        "name": "Magnus",
        "nation": "usa",
        "tier": 6
    },
    "22081": {
        "name": "ELC AMX-901",
        "nation": "france",
        "tier": 8
    },
    "22097": {
        "name": "Churchill VIII",
        "nation": "uk",
        "tier": 6
    },
    "22273": {
        "name": "Object 260",
        "nation": "ussr",
        "tier": 10
    },
    "22305": {
        "name": "AE Phase I",
        "nation": "usa",
        "tier": 9
    },
    "22337": {
        "name": "Sentinelle",
        "nation": "france",
        "tier": 8
    },
    "22353": {
        "name": "Churchill W",
        "nation": "uk",
        "tier": 6
    },
    "22529": {
        "name": "LT-432",
        "nation": "ussr",
        "tier": 8
    },
    "22545": {
        "name": "Kanonenjagdpanzer 105",
        "nation": "germany",
        "tier": 8
    },
    "22561": {
        "name": "TS-5",
        "nation": "usa",
        "tier": 8
    },
    "22609": {
        "name": "Caernarvon Defender",
        "nation": "other",
        "tier": 8
    },
    "22785": {
        "name": "Triumphant",
        "nation": "ussr",
        "tier": 6
    },
    "22801": {
        "name": "Icebreaker",
        "nation": "germany",
        "tier": 6
    },
    "22817": {
        "name": "M-VI-Yoh",
        "nation": "usa",
        "tier": 10
    },
    "22865": {
        "name": "Charlemagne",
        "nation": "uk",
        "tier": 8
    },
    "23041": {
        "name": "T-34 shielded",
        "nation": "ussr",
        "tier": 5
    },
    "23057": {
        "name": "Kunze Panzer",
        "nation": "germany",
        "tier": 7
    },
    "23073": {
        "name": "M-V-Yoh",
        "nation": "usa",
        "tier": 9
    },
    "23121": {
        "name": "Cobra",
        "nation": "uk",
        "tier": 9
    },
    "23297": {
        "name": "Object 244",
        "nation": "ussr",
        "tier": 6
    },
    "23313": {
        "name": "Kampfpanzer 50 t",
        "nation": "germany",
        "tier": 10
    },
    "23329": {
        "name": "M-III-Yoh",
        "nation": "usa",
        "tier": 8
    },
    "23377": {
        "name": "FV1066 Senlac",
        "nation": "uk",
        "tier": 8
    },
    "23553": {
        "name": "MS-1",
        "nation": "ussr",
        "tier": 2
    },
    "23569": {
        "name": "Pz. IV Gargoyle",
        "nation": "germany",
        "tier": 5
    },
    "23585": {
        "name": "M-VII-Yoh",
        "nation": "usa",
        "tier": 7
    },
    "23633": {
        "name": "A25 Harry Hopkins I",
        "nation": "uk",
        "tier": 5
    },
    "23809": {
        "name": "Object 84",
        "nation": "ussr",
        "tier": 9
    },
    "23825": {
        "name": "Krupp-Steyr Waffenträger",
        "nation": "germany",
        "tier": 7
    },
    "23841": {
        "name": "Super Hellcat",
        "nation": "usa",
        "tier": 7
    },
    "23889": {
        "name": "FV4201 Chieftain Proto",
        "nation": "uk",
        "tier": 9
    },
    "24065": {
        "name": "LTG",
        "nation": "ussr",
        "tier": 7
    },
    "24081": {
        "name": "U-Panzer",
        "nation": "germany",
        "tier": 6
    },
    "24097": {
        "name": "BLTZ9000",
        "nation": "usa",
        "tier": 6
    },
    "24321": {
        "name": "T-100 LT",
        "nation": "ussr",
        "tier": 10
    },
    "24337": {
        "name": "M48A2 Räumpanzer",
        "nation": "germany",
        "tier": 8
    },
    "24401": {
        "name": "Vickers MBT",
        "nation": "uk",
        "tier": 8
    },
    "24577": {
        "name": "Object 268 Version 4",
        "nation": "ussr",
        "tier": 10
    },
    "24593": {
        "name": "Keiler",
        "nation": "germany",
        "tier": 8
    },
    "24609": {
        "name": "Concept 1B",
        "nation": "usa",
        "tier": 10
    },
    "24657": {
        "name": "A46 Different",
        "nation": "uk",
        "tier": 7
    },
    "24849": {
        "name": "Kryos",
        "nation": "germany",
        "tier": 6
    },
    "24865": {
        "name": "Scepter",
        "nation": "usa",
        "tier": 8
    },
    "25089": {
        "name": "Object 752",
        "nation": "ussr",
        "tier": 9
    },
    "25105": {
        "name": "Barkhan",
        "nation": "germany",
        "tier": 6
    },
    "25345": {
        "name": "Object 274a",
        "nation": "ussr",
        "tier": 8
    },
    "25361": {
        "name": "Waffenträger Ritter",
        "nation": "germany",
        "tier": 9
    },
    "25377": {
        "name": "T77",
        "nation": "usa",
        "tier": 8
    },
    "25601": {
        "name": "IS-2 Shielded",
        "nation": "ussr",
        "tier": 7
    },
    "25617": {
        "name": "HWK 30",
        "nation": "germany",
        "tier": 8
    },
    "25633": {
        "name": "M-IV-Y",
        "nation": "usa",
        "tier": 8
    },
    "25857": {
        "name": "Obj. 777 II",
        "nation": "ussr",
        "tier": 10
    },
    "25873": {
        "name": "Elefant",
        "nation": "germany",
        "tier": 8
    },
    "25889": {
        "name": "Ranger",
        "nation": "usa",
        "tier": 6
    },
    "26113": {
        "name": "Object 452K",
        "nation": "ussr",
        "tier": 9
    },
    "26129": {
        "name": "Epsilon",
        "nation": "germany",
        "tier": 6
    },
    "26145": {
        "name": "High Score",
        "nation": "usa",
        "tier": 5
    },
    "26369": {
        "name": "ST-62 Ver. 2",
        "nation": "ussr",
        "tier": 8
    },
    "26385": {
        "name": "Tiger I (tutorial)",
        "nation": "germany",
        "tier": 7
    },
    "26401": {
        "name": "Enforcer",
        "nation": "usa",
        "tier": 6
    },
    "26625": {
        "name": "T-34-85 (tutorial)",
        "nation": "ussr",
        "tier": 7
    },
    "26641": {
        "name": "Kpz 07 RH",
        "nation": "germany",
        "tier": 8
    },
    "26657": {
        "name": "ASTRON Rex 105 mm",
        "nation": "usa",
        "tier": 8
    },
    "26881": {
        "name": "Obj. 590",
        "nation": "ussr",
        "tier": 8
    },
    "26897": {
        "name": "Kpz. Pr. 68 (P)",
        "nation": "germany",
        "tier": 8
    },
    "26913": {
        "name": "Frosty",
        "nation": "usa",
        "tier": 6
    },
    "27137": {
        "name": "K-2",
        "nation": "ussr",
        "tier": 8
    },
    "27153": {
        "name": "Aufkl. Panther",
        "nation": "germany",
        "tier": 7
    },
    "27169": {
        "name": "Cyborg",
        "nation": "usa",
        "tier": 6
    },
    "27409": {
        "name": "Projekt Kpz. 07P(E)",
        "nation": "germany",
        "tier": 9
    },
    "27425": {
        "name": "TL-7-120",
        "nation": "usa",
        "tier": 9
    },
    "27665": {
        "name": "Schwarzpanzer 58",
        "nation": "germany",
        "tier": 8
    },
    "27681": {
        "name": "Pawlack Tank",
        "nation": "usa",
        "tier": 6
    },
    "27921": {
        "name": "Erich Konzept I",
        "nation": "germany",
        "tier": 9
    },
    "27937": {
        "name": "T49 Fearless",
        "nation": "usa",
        "tier": 8
    },
    "28177": {
        "name": "LKpz.70 K",
        "nation": "germany",
        "tier": 9
    },
    "28193": {
        "name": "TS-60",
        "nation": "usa",
        "tier": 8
    },
    "28433": {
        "name": "HWK 12",
        "nation": "germany",
        "tier": 9
    },
    "28449": {
        "name": "T42",
        "nation": "usa",
        "tier": 7
    },
    "28689": {
        "name": "Rhm. Pzw.",
        "nation": "germany",
        "tier": 10
    },
    "28705": {
        "name": "XM66F",
        "nation": "usa",
        "tier": 10
    },
    "28945": {
        "name": "Waffen F1.0",
        "nation": "germany",
        "tier": 10
    },
    "28961": {
        "name": "Sherman Easy 8",
        "nation": "usa",
        "tier": 7
    },
    "29201": {
        "name": "Tiger-Maus",
        "nation": "germany",
        "tier": 9
    },
    "29217": {
        "name": "MBT-B",
        "nation": "usa",
        "tier": 9
    },
    "29473": {
        "name": "ATAC",
        "nation": "usa",
        "tier": 9
    },
    "51201": {
        "name": "KV-220 Beta-Test",
        "nation": "ussr",
        "tier": 5
    },
    "51457": {
        "name": "Matilda IV",
        "nation": "ussr",
        "tier": 5
    },
    "51473": {
        "name": "Pz.Kpfw. V/IV",
        "nation": "germany",
        "tier": 5
    },
    "51489": {
        "name": "T2 Light Tank",
        "nation": "usa",
        "tier": 2
    },
    "51713": {
        "name": "Churchill III",
        "nation": "ussr",
        "tier": 5
    },
    "51729": {
        "name": "Pz.Kpfw. II Ausf. J",
        "nation": "germany",
        "tier": 3
    },
    "51745": {
        "name": "Ram II",
        "nation": "usa",
        "tier": 5
    },
    "51809": {
        "name": "Type 98 Ke-Ni Otsu",
        "nation": "japan",
        "tier": 3
    },
    "51985": {
        "name": "Pz.Kpfw. S35 739 (f)",
        "nation": "germany",
        "tier": 3
    },
    "52065": {
        "name": "Hetzer Kamesan SP",
        "nation": "japan",
        "tier": 4
    },
    "52225": {
        "name": "BT-SV",
        "nation": "ussr",
        "tier": 3
    },
    "52241": {
        "name": "Pz.Kpfw. B2 740 (f)",
        "nation": "germany",
        "tier": 4
    },
    "52257": {
        "name": "M4A2E4 Sherman",
        "nation": "usa",
        "tier": 5
    },
    "52481": {
        "name": "Valentine II",
        "nation": "ussr",
        "tier": 4
    },
    "52497": {
        "name": "Pz.Kpfw. 38H 735 (f)",
        "nation": "germany",
        "tier": 2
    },
    "52513": {
        "name": "M6A2E1",
        "nation": "usa",
        "tier": 7
    },
    "52561": {
        "name": "Tortoise",
        "nation": "uk",
        "tier": 9
    },
    "52737": {
        "name": "M3 Light",
        "nation": "ussr",
        "tier": 3
    },
    "52769": {
        "name": "M22 Locust",
        "nation": "usa",
        "tier": 3
    },
    "52993": {
        "name": "A-32",
        "nation": "ussr",
        "tier": 4
    },
    "53025": {
        "name": "M6A2E1 EXP",
        "nation": "usa",
        "tier": 8
    },
    "53249": {
        "name": "KV-5",
        "nation": "ussr",
        "tier": 8
    },
    "53505": {
        "name": "T-127",
        "nation": "ussr",
        "tier": 3
    },
    "53537": {
        "name": "T1E6",
        "nation": "usa",
        "tier": 2
    },
    "53585": {
        "name": "Matilda Black Prince",
        "nation": "uk",
        "tier": 5
    },
    "53761": {
        "name": "SU-85I",
        "nation": "ussr",
        "tier": 5
    },
    "53841": {
        "name": "TOG II*",
        "nation": "uk",
        "tier": 6
    },
    "54097": {
        "name": "AT 15A",
        "nation": "uk",
        "tier": 7
    },
    "54273": {
        "name": "SU-76I",
        "nation": "ussr",
        "tier": 3
    },
    "54289": {
        "name": "Löwe",
        "nation": "germany",
        "tier": 8
    },
    "54353": {
        "name": "Excelsior",
        "nation": "uk",
        "tier": 5
    },
    "54529": {
        "name": "Tetrarch",
        "nation": "ussr",
        "tier": 2
    },
    "54545": {
        "name": "T-25",
        "nation": "germany",
        "tier": 5
    },
    "54785": {
        "name": "SU-100Y",
        "nation": "ussr",
        "tier": 6
    },
    "54801": {
        "name": "T-15",
        "nation": "germany",
        "tier": 3
    },
    "54865": {
        "name": "Light Mk. VIC",
        "nation": "uk",
        "tier": 2
    },
    "55057": {
        "name": "Pz.Kpfw. IV hydrostat.",
        "nation": "germany",
        "tier": 5
    },
    "55073": {
        "name": "T7 Combat Car",
        "nation": "usa",
        "tier": 2
    },
    "55297": {
        "name": "SU-122-44",
        "nation": "ussr",
        "tier": 7
    },
    "55313": {
        "name": "8,8 cm Pak 43 Jagdtiger",
        "nation": "germany",
        "tier": 8
    },
    "55889": {
        "name": "Cromwell B",
        "nation": "uk",
        "tier": 6
    },
    "56097": {
        "name": "M4A3E8 Fury",
        "nation": "usa",
        "tier": 6
    },
    "56577": {
        "name": "LTP",
        "nation": "ussr",
        "tier": 3
    },
    "56609": {
        "name": "T28 Concept",
        "nation": "usa",
        "tier": 7
    },
    "57105": {
        "name": "Dicker Max",
        "nation": "germany",
        "tier": 6
    },
    "57361": {
        "name": "Pz.Kpfw. IV Schmalturm",
        "nation": "germany",
        "tier": 6
    },
    "57617": {
        "name": "Panther/M10",
        "nation": "germany",
        "tier": 7
    },
    "58641": {
        "name": "VK 72.01 (K)",
        "nation": "germany",
        "tier": 10
    },
    "58881": {
        "name": "IS-5 (Object 730)",
        "nation": "ussr",
        "tier": 8
    },
    "59137": {
        "name": "IS-2 (1945)",
        "nation": "ussr",
        "tier": 7
    },
    "59649": {
        "name": "ISU-122S",
        "nation": "ussr",
        "tier": 7
    },
    "59665": {
        "name": "Großtraktor - Krupp",
        "nation": "germany",
        "tier": 3
    },
    "59905": {
        "name": "T-54 first prototype",
        "nation": "ussr",
        "tier": 8
    },
    "60161": {
        "name": "IS-2Sh",
        "nation": "ussr",
        "tier": 8
    },
    "60177": {
        "name": "Panther mit 8,8 cm L/71",
        "nation": "germany",
        "tier": 8
    },
    "60417": {
        "name": "IS-3 Defender",
        "nation": "ussr",
        "tier": 8
    },
    "60929": {
        "name": "BT-7 artillery",
        "nation": "ussr",
        "tier": 3
    },
    "62737": {
        "name": "leKpz M 41 90 mm",
        "nation": "germany",
        "tier": 8
    },
    "62977": {
        "name": "T-44-100",
        "nation": "ussr",
        "tier": 8
    },
    "62993": {
        "name": "VK 45.03",
        "nation": "germany",
        "tier": 7
    },
    "63553": {
        "name": "AMX Chasseur de chars",
        "nation": "france",
        "tier": 8
    },
    "63585": {
        "name": "Tiger Kuromorimine SP",
        "nation": "japan",
        "tier": 6
    },
    "63601": {
        "name": "Dracula",
        "nation": "other",
        "tier": 7
    },
    "63841": {
        "name": "Panzer IV Ankou Special",
        "nation": "japan",
        "tier": 5
    },
    "64001": {
        "name": "T-34-85 Rudy",
        "nation": "ussr",
        "tier": 7
    },
    "64017": {
        "name": "Tankenstein",
        "nation": "germany",
        "tier": 7
    },
    "64065": {
        "name": "FCM 50 t",
        "nation": "france",
        "tier": 8
    },
    "64081": {
        "name": "Mk I* Heavy Tank",
        "nation": "uk",
        "tier": 1
    },
    "64257": {
        "name": "T-34-85 Victory",
        "nation": "ussr",
        "tier": 6
    },
    "64273": {
        "name": "Snowstorm Jagdtiger 8.8",
        "nation": "germany",
        "tier": 8
    },
    "64337": {
        "name": "AC IV Sentinel",
        "nation": "uk",
        "tier": 6
    },
    "64529": {
        "name": "E 25",
        "nation": "germany",
        "tier": 7
    },
    "64561": {
        "name": "112 Glacial",
        "nation": "china",
        "tier": 8
    },
    "64593": {
        "name": "Angry Connor",
        "nation": "uk",
        "tier": 5
    },
    "64769": {
        "name": "IS-6 Fearless",
        "nation": "ussr",
        "tier": 8
    },
    "64801": {
        "name": "T34 (1776)",
        "nation": "usa",
        "tier": 8
    },
    "64849": {
        "name": "Sentinel AC I",
        "nation": "uk",
        "tier": 4
    },
    "65329": {
        "name": "Type 62",
        "nation": "china",
        "tier": 7
    },
    "65377": {
        "name": "Type 3 Chi-Nu Kai Shinobi",
        "nation": "japan",
        "tier": 5
    }
})

module.exports = {
    tanks
}