module.exports = {
    updateLevelDesc: 
        async function(level, d, user, password) {
            let desc = d;

            if(!level || level == "") throw new Error("Please provide a level ID!");
            if(Number(level) == NaN) throw new Error("A level ID must be a number!");
            if(!desc) desc = "(No description provided)";
            if(!user || user == "") throw new Error("Please provide a user ID or name!");
            if(!password || password == "") throw new Error("Please provide a password!");
            
            const axios = require("axios");
            const { headers, server, secret } = require("../config.json");

            const data = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: user,
                secret: secret
            };

            let r = await axios.post(server + "getGJUsers20.php", data, {
                headers: headers
            })

            if(r.data == -1) throw new Error("-1 This user is not found.")
            if(r.data.toString().toLowerCase() == "error code: 1020") throw new Error("1020 error: Request denied.");
            if(r.data.toString().toLowerCase() == "error code: 1005") throw new Error("1005 error: Your IP address has been blocked from sending requests to a server. It's recommended to use locally (directly from a PC).")

            let id = r.data.split(":16:")[1].split(":3:")[0];
            if(Number(id) < 71 || id.includes(":")) id = r.data.split(":16:")[2].split(":3:")[0];

            const { gjp } = require("../misc/gjp.js");
            const { encURLSafeBase64 } = require("./encURLSafeBase64.js");

            const uLDdata = {
                accountID: id,
                gjp: gjp(password),
                levelID: level,
                levelDesc: encURLSafeBase64(desc),
                secret: secret
            }

            let res = await axios.post(server + "updateGJDesc20.php", uLDdata, {
                headers: headers
            })

            if(res.data == -1) throw new Error("-1 Failed to update the description.")
            if(res.data.toString().toLowerCase() == "error code: 1020") throw new Error("1020 error: Request denied.");
            if(res.data.toString().toLowerCase() == "error code: 1005") throw new Error("1005 error: Your IP address has been blocked from sending requests to a server. It's recommended to use locally (directly from a PC).")

            return 1;
        }
}