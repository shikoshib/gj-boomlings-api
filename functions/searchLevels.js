module.exports = {
    searchLevels:
        async function(query, page = 1) {
            const axios = require("axios");
            const { headers, server, secret } = require("../config.json");

            const { getLevelByID } = require("../functions/getLevelByID.js");
            
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
            let result = [];
            for(const lvl of levels) {
                let id = lvl.split(":")[1];
                result.push(await getLevelByID(id))
            }

            return result;
        }
}