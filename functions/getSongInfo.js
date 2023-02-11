module.exports = {
    getSongInfo:
        async function(song) {
            if(!song) throw new Error("Please provide a song ID.");
            if(isNaN(song)) throw new Error("A song ID must be a number.")
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");

            const data = {
                songID: song,
                secret: "Wmfd2893gb7"
            }

            let res = await gjReq('getGJSongInfo', data);
            if(res.data == -2) throw new Error(`-2. Couldn't find a song with ID ${song}.`)

            if(res.data.startsWith("error code")) {
                res = await gjWReq("getSongInfo", song);
                if(res.status == 403) throw new Error(res.data.error);
                return res.data;
            }

            const result = {
                "name": res.data.split("|~2~|~")[1].split("~|~3~|~")[0],
                "id": Number(res.data.split("1~|~")[1].split("~|~2~|")[0]),
                "artist": res.data.split("~|~4~|~")[1].split("~|~5~|~")[0],
                "artistId": Number(res.data.split("~|~3~|~")[1].split("~|~4~|~")[0]),
                "fileSize": `${res.data.split("~|~5~|~")[1].split("~|~6~|~")[0]} MB`,
                "link": decodeURIComponent(res.data.split("~|~10~|~")[1].split("~|~7~|~")[0])
            }

            return result;
        }
}