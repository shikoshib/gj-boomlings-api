module.exports = {
    dlLevel: async function (level) {
        const zlib = require("zlib");
        if (!level) throw new Error("Please provide a level ID.");
        if (isNaN(level)) throw new Error("The level parameter should be a number.");

        const { gjReq } = require("../gjReq");

        const data = {
            levelID: level.toString().trim(),
            secret: "Wmfd2893gb7"
        }

        let res = await gjReq("downloadGJLevel22", data);
        if (res.data == -1) return {};
        const XOR = require("../xor");
        let xor = new XOR;

        let s = res.data.split("#")[0].split(":");

        let id = Number(s[1]);
        let name = s[3];
        let description = Buffer.from(s[5], "base64url").toString();
        let levelString = s[7];
        let version = Number(s[9]);
        let playerID = Number(s[11]);
        let difficulty = s[15];
        let downloads = Number(s[17]);
        let officialSongID = Number(s[19]);
        let gameVersion = Number(s[21]);
        let likes = Number(s[23]);
        let isDemon = s[25];
        let stars = Number(s[31]);
        let isFeatured = s[33];
        let isEpic = s[35];
        let objStats = Number(s[37]);
        let length = Number(s[39]);
        let copiedID = Number(s[41]);
        let is2P = s[43];
        let uploaded = s[45];
        let updated = s[47];
        let NGSongID = Number(s[49]);
        let coins = Number(s[53]);
        let coinsVerified = s[55];
        let starReq = Number(s[57]);
        let isLDM = s[63];
        let password = xor.decrypt(s[67].split("#")[0], 26364);
        if (password.length == 7) password = password.replace("1", "");

        let diffObj = {
            "-10": "Auto",
            0: "N/A",
            10: "Easy",
            20: "Normal",
            30: "Hard",
            40: "Harder",
            50: "Insane"
        }

        if (Boolean(Number(isDemon))) {
            diffObj = {
                10: "Easy Demon",
                20: "Medium Demon",
                30: "Hard Demon",
                40: "Insane Demon",
                50: "Extreme Demon"
            }
        }

        const lengthObj = {
            0: "Tiny",
            1: "Short",
            2: "Medium",
            3: "Long",
            4: "XL",
            5: "Platformer"
        }

        const versionObj = {
            10: "1.7",
            18: "1.8",
            19: "1.9",
            20: "2.0",
            21: "2.1",
            22: "2.2"
        }

        const buffer = await new Promise((resolve, reject) => {
            zlib.unzip(Buffer.from(levelString, "base64"), (err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        })
        const rawData = buffer.toString();
        const objs = rawData.split(";");
        objs.shift();

        const epicObj = {
            0: false, // Not good, but I can't think of a string value for levels not rated Epic.
            1: "Epic",
            2: "Legendary",
            3: "Mythic"
        }

        let song;
        const { getOfficialSongInfo } = require("./getOfficialSongInfo");
        const { getSongInfo } = require("./getSongInfo");
        if (officialSongID && !NGSongID) {
            song = getOfficialSongInfo(officialSongID + 1);
        } else if (NGSongID && !officialSongID) {
            let findSong = await getSongInfo(NGSongID);
            song = findSong;
        }else if(!officialSongID&&!NGSongID){
            song = getOfficialSongInfo(1);
        }

        let result = {
            id: id,
            name: name,
            description: !description ? "(No description provided)" : description,
            levelVersion: version,
            playerID: playerID,
            difficulty: diffObj[difficulty],
            stars: stars,
            downloads: downloads,
            likes: likes,
            disliked: likes < 0 ? true : false,
            length: lengthObj[length],
            password: password,
            demon: Boolean(Number(isDemon)),
            featured: Boolean(Number(isFeatured)),
            rating: epicObj[Number(isEpic)],
            objects: objs.length - 1,
            uploaded: uploaded,
            updated: updated,
            starsRequested: starReq,
            gameVersion: versionObj[gameVersion] ? versionObj[gameVersion] : "Pre-1.7",
            ldm: Boolean(Number(isLDM)),
            copiedFrom: copiedID,
            large: objStats > 4e4 ? true : false,
            twoPlayer: Boolean(Number(is2P)),
            coins: coins,
            verifiedCoins: Boolean(Number(coinsVerified)),
            song: song

            get epic() {
                return Boolean(this.rating);
            }
        }

        if (s[69] && s[68] != "41") {
            let songsIDArray = [];
            let sfxIDArray = [];
            for (let songID of s[69].split(",")) {
                if (songID == NGSongID) continue;
                songsIDArray.push(Number(songID));
            }
            for (let sfx of s[71].split("#")[0].split(",")) {
                sfxIDArray.push(Number(sfx));
            }
            result.additionalSongs = songsIDArray;
            result.sfx = sfxIDArray;
        }

        return result;
    }
}
