module.exports = {
    dlLevel:
        async function(level) {
            const bs = require("js-base64")
            if(!level || level == "") throw new Error("Please provide a level ID.");
            if(isNaN(level)) throw new Error("The level parameter should be a number.");

            const axios = require("axios");
            const { headers, server } = require("../config.json");

            const XOR = require("../misc/xor.js");
            let xor = new XOR()

            const data = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                levelID: level.toString().trim(),
                secret: "Wmfd2893gb7"
            }

            let res = await axios.post(server + 'downloadGJLevel22.php', data, {
                headers: headers
            }).catch(e => {
                if(e.response.data == -1) throw new Error("-1 This user is not found.");
                throw new Error(e.response.data);
            })

            let spl = res.data.split(":");
            let levelInfo = [];
            for(let i =0;i<spl.length;i++) {
              if(i%2!=0) {
                levelInfo.push(spl[i-1]+`:`+spl[i]);
              }
            }

            let id = levelInfo[0].split("1:")[1];
            let name = levelInfo[1].split("2:")[1];
            let description = bs.decode(levelInfo[2].split("3:")[1])
            let version = levelInfo[4].split("5:")[1];
            let difficulty = levelInfo[7].split("9:")[1];
            let downloads = levelInfo[8].split("10:")[1];
            let officialSong = levelInfo[9].split("12:")[1];
            let gameVersion = levelInfo[10].split("13:")[1];
            let likes = levelInfo[11].split("14:")[1];
            let demonBool = levelInfo[12].split("17:")[1];
            let stars = levelInfo[15].split("18:")[1];
            let ftrd = levelInfo[16].split("19:")[1];
            let epic = levelInfo[17].split("42:")[1];
            let objects = levelInfo[18].split("45:")[1];
            let length = levelInfo[19].split("15:")[1];
            let copiedID = levelInfo[20].split("30:")[1];
            let twoPlayer = levelInfo[21].split("31:")[1];
            let uploaded = levelInfo[22].split("28:")[1];
            let updated = levelInfo[23].split("29:")[1];
            let customSong = levelInfo[24].split("35:")[1];
            let coins = levelInfo[26].split("37:")[1];
            let verifiedCoins = levelInfo[27].split("38:")[1];
            let starsRequested = levelInfo[28].split("39:")[1];
            let ldm = levelInfo[31].split("40:")[1];
            let password = xor.decrypt(levelInfo[32].split("27:")[1].split("#")[0], 26364);

            let disliked = false;
            if(likes.includes("-")) disliked = true;

            if(verifiedCoins == "0") verifiedCoins = false;
            if(verifiedCoins == "1") verifiedCoins = true;

            let demonBoolDecoding = {
                '1': true,
                '': false,
                '0': false
            }

            let featuredDecoding = {
                "0": false,
                "1": true,
                undefined: true
            }

            let featured = featuredDecoding[ftrd];
            if(featured == undefined) featured = true;

            let difficultyDecoding = {
                "-10": "Auto",
                "0": "Unrated",
                "10": "Easy",
                "20": "Normal",
                "30": "Hard",
                "40": "Harder",
                "50": "Insane"
            }

            if(demonBoolDecoding[demonBool] == true) {
                difficultyDecoding = {
                    "10": "Easy Demon",
                    "20": "Medium Demon",
                    "30": "Hard Demon",
                    "40": "Insane Demon",
                    "50": "Extreme Demon"
                }
            }
            
            const lengthDecoding = {
                "0": "Tiny",
                "1": "Short",
                "2": "Medium",
                "3": "Long",
                "4": "XL"
            }

            const decodeGameVersion = {
                "1": "Pre-1.7",
                "2": "Pre-1.7",
                "3": "Pre-1.7",
                "4": "Pre-1.7",
                "5": "Pre-1.7",
                "6": "Pre-1.7",
                "7": "Pre-1.7",
                "10": "1.7",
                "18": "1.8",
                "19": "1.9",
                "20": "2.0",
                "21": "2.1"
            }

            if(description == '') description = "(No description provided)";

            const { getLevelByID } = require("./getLevelByID.js");
            let basicInfoAboutLevel = await getLevelByID(id);
            let result = {
                id: Number(id),
                name: name,
                description: description,
                creator: basicInfoAboutLevel.creator,
                level_version: Number(version),
                difficulty: difficultyDecoding[difficulty],
                stars: Number(stars),
                downloads: Number(downloads),
                likes: Number(likes),
                disliked: disliked,
                length: lengthDecoding[length],
                password: password.replace("1", ""), 
                demon: demonBoolDecoding[demonBool],
                featured: featured,
                epic: demonBoolDecoding[epic],
                objects: Number(objects),
                uploaded: uploaded,
                updated: updated,
                stars_requested: Number(starsRequested),
                game_version: decodeGameVersion[gameVersion],
                ldm: demonBoolDecoding[ldm],
                copied: Number(copiedID),
                two_p: demonBoolDecoding[twoPlayer],
                coins: Number(coins),
                verified_coins: verifiedCoins,
                song: basicInfoAboutLevel.song,
            }
            if(basicInfoAboutLevel.pointercrate != undefined) {
                result = {
                    id: Number(id),
                    name: name,
                    description: description,
                    creator: basicInfoAboutLevel.creator,
                    level_version: Number(version),
                    difficulty: difficultyDecoding[difficulty],
                    stars: Number(stars),
                    downloads: Number(downloads),
                    likes: Number(likes),
                    disliked: disliked,
                    length: lengthDecoding[length],
                    password: password.replace("1", ""), 
                    demon: demonBoolDecoding[demonBool],
                    featured: featured,
                    epic: demonBoolDecoding[epic],
                    objects: Number(objects),
                    uploaded: uploaded,
                    updated: updated,
                    stars_requested: Number(starsRequested),
                    game_version: decodeGameVersion[gameVersion],
                    ldm: demonBoolDecoding[ldm],
                    copied: Number(copiedID),
                    two_p: demonBoolDecoding[twoPlayer],
                    coins: Number(coins),
                    verified_coins: verifiedCoins,
                    song: basicInfoAboutLevel.song,
                    pointercrate: basicInfoAboutLevel.pointercrate
                }
            }

          return result;
        }
}