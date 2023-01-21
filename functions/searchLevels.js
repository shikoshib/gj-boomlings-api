module.exports = {
    searchLevels:
        async function(query, page = 1) {
            const axios = require("axios");
            const { headers, server, secret } = require("../config.json");

            const { decodeLevelRes } = require("../misc/decodeLevelRes.js");
            
            const data = {
                type: 0,
                str: query,
                page: Number(page) - 1,
                secret: secret
            }

            let res = await axios.post(server + "getGJLevels21.php", data, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data);
            })

            let levels = res.data.split("#")[0].split("|");
            let creators = res.data.split("#")[1].split("|");
            let songs = res.data.split("#")[2].split(":");

            let result = [];

            let encCreators = {};
            let encSongs = {};
            
            creators.forEach(c => {
                let playerID = c.split(":")[0];
                let username = c.split(":")[1];
                encCreators[playerID] = username;
            })

            songs.forEach(s => {
                let songId = s.split("~|~")[1];
                let songName = s.split("~|~")[3];
                let songArtistID = s.split("~|~")[5];
                let songArtist = s.split("~|~")[7];
                let size = s.split("~|~")[9];
                let link = s.split("~|~")[13];
                
                encSongs[songId] = {
                    "name": songName,
                    "id": Number(songId),
                    "artist": songArtist,
                    "artistId": Number(songArtistID),
                    "fileSize": `${size} MB`,
                    "link": decodeURIComponent(link)
                };
            })

            for(const l of levels) {
                let decLvl = decodeLevelRes(l);
                const { getOfficialSongInfo } = require("./getOfficialSongInfo.js");

                let lvl = decLvl.res;
                let officialSongID = Number(decLvl.officialSong);
                let songID = Number(decLvl.customSong);
                let playerId = decLvl.playerID;
                let song;

                if(officialSongID == 0 && songID != 0 || officialSongID != 0 && songID != 0) song = encSongs[songID.toString()];
                if(officialSongID != 0 && songID == 0) song = getOfficialSongInfo(officialSongID + 1);
                if(officialSongID == 0 && songID == 0) song = getOfficialSongInfo(1);

                lvl['creator'] = encCreators[playerId] != undefined ? encCreators[playerId] : "-";
                lvl['song'] = song;

                result.push(lvl);
            }

            return result;
        }
}