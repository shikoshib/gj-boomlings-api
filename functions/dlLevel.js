/**
 * @typedef {Object} Song
 * @property {string} name - The song's name.
 * @property {number} id - The song's ID.
 * @property {string} artist - The song artist.
 * @property {number} artistId - The song artist's ID on Newgrounds.
 * @property {number} fileSize - The song's file size in megabytes.
 * @property {string} link - The direct link to download the song file.
 */

/**
 * A playable Geometry Dash online level.
 * @typedef {Object} Level
 * @property {number} id - The level's ID.
 * @property {string} name - The level's name.
 * @property {string} description - The level's description.
 * @property {string} levelVersion - The level's current version number.
 * @property {number} playerID - The level uploader's player ID.
 * @property {string} difficulty - The level's difficulty.
 * @property {number} stars - The amount of stars given when completing the level.
 * @property {number} downloads - The amount of times the level has been downloaded.
 * @property {number} likes - The amount of likes the level has.
 * @property {boolean} disliked - Whether the level is disliked (i.e. if the likes count is less than 0).
 * @property {string} length - The level's length.
 * @property {string} password - The level's password. Otherwise, returns "" (an empty string) if the level isn't copyable, and "1" if the level is copyable without a password.
 * @property {boolean} demon - Whether the level is a demon.
 * @property {boolean} featured - Whether the level is featured.
 * @property {boolean} epic - Whether the level is epic-rated.
 * @property {string|boolean} rating - Primarily used for new 2.2 ratings. Returns either "epic", "legendary", "mythic", or `false` if the level's rating is lower than epic.
 * @property {number} objects - The amount of objects the level has, based on the level data.
 * @property {string} uploaded - How long ago the level was uploaded.
 * @property {string} updated - How long ago the level was last updated.
 * @property {number} starsRequested - The amount of stars the uploader requested for this level.
 * @property {string} gameVersion - The version of the game used to upload the current version of the level. Returns "Pre-1.7" if the level was last updated in 1.6 or earlier.
 * @property {boolean} ldm - Whether the level has a "Low Detail Mode" option.
 * @property {number} copiedID - The original level's ID if this level was copied. Returns 0 if the level is original on itself.
 * @property {boolean} large - Whether the level is considered "large" (i.e. has more than 40k objects).
 * @property {boolean} twoPlayer - Whether the level can be played by two people.
 * @property {number} coins - The amount of coins the level has.
 * @property {boolean} verifiedCoins - Whether the coins are verified.
 * @property {Song} song - The main song used in the level.
 * @property {Array} additionalSongs - The array containing additional songs' IDs.
 * @property {Array} sfx - The array containing sound effects' IDs.
 */

module.exports = {
    /**
     * Downloads a level.
     * @param {number} level - The level ID.
     * @returns {Level}
     */
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
            0: null,
            1: "epic",
            2: "legendary",
            3: "mythic"
        }

        let song;
        const { getOfficialSongInfo } = require("./getOfficialSongInfo");
        const { getSongInfo } = require("./getSongInfo");
        if (officialSongID && !NGSongID) {
            song = getOfficialSongInfo(officialSongID + 1);
        } else if (NGSongID && !officialSongID) {
            let findSong = await getSongInfo(NGSongID);
            song = findSong;
        } else if (!officialSongID && !NGSongID) {
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
            epic: Number(isEpic) >= 1,
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
            song: song,
            additionalSongs: [],
            sfx: []
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
