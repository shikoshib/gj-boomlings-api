module.exports = {
    getUserLevels:
        async function(str, page = 1) {
            if(!str || str == "") throw new Error("Please provide a username or player ID!");

            const axios = require("axios");
            const { headers, secret, server } = require("../config.json");
            const { getLevelByID } = require("./getLevelByID.js");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(str);

            const data = {
                type: 5,
                str: user.playerID,
                secret: secret,
                page: Number(page) - 1
            }

            let res = await axios.post(server + "getGJLevels21.php", data, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data);
            })

            let levels = res.data.split("#")[0].split("|");
            let result = [];
            for(const lvl of levels) {
                let id = lvl.split(":")[1];
                result.push(await getLevelByID(id))
            }

            return result;
        }
}