const { getOfficialSongInfo } = require("../functions/getOfficialSongInfo");
const { rgbToHEX } = require("./rgbToHEX");
const colors = require("./colors.json");
module.exports = class GJDecode {
    decodeScoresUser(u) {
        let iconObj = {
            0: "cube",
            1: "ship",
            2: "ball",
            3: "ufo",
            4: "wave",
            5: "robot",
            6: "spider",
            7: "swing",
            8: "jetpack"
        }
        let s = u.split(":");
        return {
            name: s[1],
            playerID: Number(s[3]),
            accountID: Number(s[21]),
            rank: Number(s[9]),
            stars: Number(s[23]),
            diamonds: Number(s[29]),
            secretCoins: Number(s[5]),
            userCoins: Number(s[7]),
            demons: Number(s[31]),
            moons: Number(s[25]),
            creatorPoints: Number(s[27]),
            c1: rgbToHEX(colors[s[13]]),
            c2: rgbToHEX(colors[s[15]]),
            iconType: iconObj[s[17]]
        }
    }
    decodeSearchResults(res) {
        let levels = res.split("#")[0].split("|");
        let creators = res.split("#")[1].split("|");
        let songs = res.split("#")[2].split("~:~");

        let result = [];

        let encCreators = {};
        let encSongs = {};

        creators.forEach(c => {
            let playerID = c.split(":")[0];
            let username = c.split(":")[1];
            encCreators[playerID] = username;
        })

        songs.forEach(s => {
            let sp = s.split("~|~");
            let songId = sp[1];
            let songName = sp[3];
            let songArtistID = sp[5];
            let songArtist = sp[7];
            let size = sp[9];
            let link = sp[13];

            encSongs[songId] = {
                "name": songName,
                "id": Number(songId),
                "artist": songArtist,
                "artistId": Number(songArtistID),
                "fileSize": `${size} MB`,
                "link": decodeURIComponent(link)
            };
        })

        for (const l of levels) {
            let s = l.split(":");

            let diffObj = {
                "-10": "Auto",
                0: "Unrated",
                10: "Easy",
                20: "Normal",
                30: "Hard",
                40: "Harder",
                50: "Insane"
            }

            if (Boolean(Number(s[21]))) {
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

            let lvl = {
                id: Number(s[1]),
                name: s[3],
                levelVersion: Number(s[5]),
                playerID: Number(s[7]),
                difficulty: diffObj[s[11]],
                stars: Number(s[27]),
                downloads: Number(s[13]),
                likes: Number(s[19]),
                disliked: s[19] < 0 ? true : false,
                length: lengthObj[s[37]],
                demon: Boolean(Number(s[21])),
                featured: Boolean(Number(s[29])),
                epic: Boolean(Number(s[31])),
                objects: Number(s[33]),
                starsRequested: Number(s[47]),
                gameVersion: versionObj[s[17]] ? versionObj[s[17]] : "Pre-1.7",
                copiedFrom: Number(s[39]),
                large: s[33] > 4e4 ? true : false,
                twoPlayer: Boolean(Number(s[41])),
                coins: Number(s[43]),
                verifiedCoins: Boolean(Number(s[45]))
            }

            let officialSongID = Number(s[15]);
            let songID = Number(s[53]);
            let playerId = s[7];
            let song;

            if (officialSongID == 0 && songID != 0 || officialSongID != 0 && songID != 0) song = encSongs[songID.toString()];
            if (officialSongID != 0 && songID == 0) song = getOfficialSongInfo(officialSongID + 1);
            if (officialSongID == 0 && songID == 0) song = getOfficialSongInfo(1);

            lvl['creator'] = encCreators[playerId] ? encCreators[playerId] : "-";
            lvl['song'] = song;

            result.push(lvl);
        }
        return result;
    }
    decodeLists(res) {
        let rawLists = res.split("#")[0].split("|");
        let rawAccounts = res.split("#")[1].split("|");

        let accounts = [];
        rawAccounts.forEach(a => {
            let s = a.split(":");
            accounts.push({
                username: s[1],
                playerID: Number(s[0]),
                accountID: s[2]
            })
        })

        let lists = [];

        let diffObj = {
            "-1": "N/A",
            "0": "Auto",
            "1": "Easy",
            "2": "Normal",
            "3": "Hard",
            "4": "Harder",
            "5": "Insane",
            "6": "Easy Demon",
            "7": "Medium Demon",
            "8": "Hard Demon",
            "9": "Insane Demon",
            "10": "Extreme Demon"
        }

        rawLists.forEach(l => {
            let s = l.split(":");
            let rawLvls = s[21].split(",");
            let lvls = [];
            for (let lvl of rawLvls) {
                lvls.push(Number(lvl));
            }
            let playerID = accounts.filter(a => a.accountID == s[9])[0].playerID;
            lists.push({
                id: Number(s[1]),
                name: s[3],
                description: Buffer.from(s[5], "base64").toString(),
                difficulty: diffObj[s[15]],
                username: s[11],
                playerID: playerID,
                accountID: Number(s[9]),
                downloads: Number(s[13]),
                likes: Number(s[17]),
                diamonds: Number(s[23]),
                disliked: s[17] < 0 ? true : false,
                levels: lvls,
                required: Number(s[25]),
                uploadedUnix: Number(s[27])
            })
        })

        return lists;
    }
}