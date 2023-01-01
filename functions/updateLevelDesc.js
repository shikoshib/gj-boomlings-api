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
            }).catch(e => {
                throw new Error(e.response.data);
            })

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
            }).catch(e => {
                if(e.response.data == -1) throw new Error("-1 Failed to update the description.")
                throw new Error(e.response.data);
            })
            
            return 1;
        }
}