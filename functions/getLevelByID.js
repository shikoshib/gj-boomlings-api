module.exports = {
    getLevelByID:
        async function(id) {
            if(!id || id == "") throw new Error("Please provide a level ID!");
            if(isNaN(id)) throw new Error("The level ID should be a number!");

            const {decodeLevel} = require("../misc/decodeLevel.js");
            const axios = require("axios");
            const {headers, server, secret} = require("../config.json");

            const data = {
                secret: secret,
                str: id,
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                type: 0
            }

            let res = await axios.post(server + "getGJLevels21.php", data, {
                headers: headers
            })
            
            if(res.data == -1) throw new Error("-1 Not found.");
            if(res.data.toLowerCase() == "error code: 1020") throw new Error("1020 error: Request denied.");
            if(res.data.toLowerCase() == "error code: 1005") throw new Error("1005 error: Your IP address has been blocked from sending requests to a server. It's recommended to use locally (directly from a PC).")

            return decodeLevel(res.data);
        }
}