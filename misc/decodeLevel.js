module.exports = {
    decodeLevel:
        async function(level){
            const {decB64} = require("./decB64.js");
            
            let spl = level.split(':');
            let levelInfo = [];
            for(let i =0;i<spl.length;i++) {
              if(i%2!=0) {
                levelInfo.push(spl[i-1]+`:`+spl[i]);
              }
            }
            
            let id = levelInfo[0].split("1:")[1];
            let name = levelInfo[1].split("2:")[1];
            let version = levelInfo[2].split("5:")[1];
            let difficulty = levelInfo[5].split("9:")[1];
            let downloads = levelInfo[6].split("10:")[1];
            let officialSong = levelInfo[7].split("12:")[1];
            let gameVersion = levelInfo[8].split("13:")[1];
            let likes = levelInfo[9].split("14:")[1];
            let demonBool = levelInfo[10].split("17:")[1];
            let stars = levelInfo[13].split("18:")[1];
            let ftrd = levelInfo[14].split("19:")[1];
            let epic = levelInfo[15].split("42:")[1];
            let objs = levelInfo[16].split("45:")[1];
            let desc = levelInfo[17].split("3:")[1];
            let length = levelInfo[18].split("15:")[1];
            let copiedID = levelInfo[19].split("30:")[1];
            let twoPlayer = levelInfo[20].split("31:")[1];
            let coins = levelInfo[21].split("37:")[1];
            let verifiedCoins = levelInfo[22].split("38:")[1];
            let starsRequested = levelInfo[23].split("39:")[1];
            let customSong = levelInfo[26].split("35:")[1].split("#")[0];
            let author = "-";
            
            if(levelInfo.length == 29) {
                author = levelInfo[27].split(":")[0];
            }

            let disliked = likes.includes("-") ? true : false;

            if(desc.includes("/")) desc = desc.split("/")[0];
            if(decB64(desc) == '') desc = "KE5vIGRlc2NyaXB0aW9uIHByb3ZpZGVkKQ=="

            let featured = Boolean(Number(ftrd));

            let difficultyDecoding = {
                "-10": "Auto",
                "0": "Unrated",
                "10": "Easy",
                "20": "Normal",
                "30": "Hard",
                "40": "Harder",
                "50": "Insane"
            }

            if(Boolean(Number(demonBool))) {
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
                "10": "1.7",
                "18": "1.8",
                "19": "1.9",
                "20": "2.0",
                "21": "2.1",
                undefined: "Pre-1.7"
            }
            
            const { getOfficialSongInfo } = require("../functions/getOfficialSongInfo.js");
            
            let song;
            if(Number(officialSong) > 0) song = getOfficialSongInfo(Number(officialSong) + 1);
            if(Number(officialSong) == 0 && Number(customSong) == 0) song = getOfficialSongInfo(1);
            if(Number(customSong) > 0) {
                let songName = level.split("~|~2~|~")[1].split("~|~3~|~")[0]
                let songId = Number(level.split("#1~|~")[1].split("~|~2~|~")[0])
                let artist = level.split("~|~4~|~")[1].split("~|~5~|~")[0]
                let artistId = Number(level.split("~|~3~|~")[1].split("~|~4~|~")[0])
                let size = `${level.split("~|~5~|~")[1].split("~|~6~|~")[0]} MB`
                let link = decodeURIComponent(level.split("~|~10~|~")[1].split("~|~7~|~")[0])

                let songinfo = {
                    "name": songName,
                    "id": songId,
                    "artist": artist,
                    "artistId": artistId,
                    "fileSize": size,
                    "link": link
                }

                song = songinfo;
            }
            
            let result = {
                id: Number(id),
                name: name,
                description: decB64(desc),
                creator: author,
                level_version: Number(version),
                difficulty: difficultyDecoding[difficulty],
                stars: Number(stars),
                downloads: Number(downloads),
                likes: Number(likes),
                disliked: disliked,
                length: lengthDecoding[length],
                demon: Boolean(Number(demonBool)),
                featured: featured,
                epic: Boolean(Number(epic)),
                objects: Number(objs),
                stars_requested: Number(starsRequested),
                game_version: decodeGameVersion[gameVersion],
                copied: Number(copiedID),
                large: Number(objs) > 40000 ? true : false,
                two_p: Boolean(Number(twoPlayer)),
                coins: Number(coins),
                verified_coins: Boolean(Number(verifiedCoins)),
                song: song
            }

            if(["Extreme Demon", "Insane Demon"].includes(difficultyDecoding[difficulty])) {
                const { demonlist } = require("./demonlist.js");
                const dlist = await demonlist(name.trim());
                if(dlist != null) result.pointercrate = dlist;
            }

            return result;
        }
}