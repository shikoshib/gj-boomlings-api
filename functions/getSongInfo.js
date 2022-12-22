module.exports = {
    getSongInfo:
        async function(song) {
            if(!song || song == "") throw new Error("Please provide a song ID.");
            if(isNaN(song)) throw new Error("A song ID must be a number.")
            const axios = require("axios")
            const {headers, server} = require("../config.json")

            const data = {
                songID: song,
                secret: "Wmfd2893gb7"
            }

            let res = await axios.post(server + 'getGJSongInfo.php', data, {
                headers: headers
            })

                if(res.data == -2) throw new Error(`-2. Couldn't find a song with ID ${song}.`)
                if(res.data.toLowerCase() == "error code: 1005") throw new Error("1005 error: Your IP address has been blocked from sending requests to a server. It's recommended to use locally (directly from a PC).")
    
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