module.exports = {
    getGauntlets: 
        async function() {
            const axios = require('axios');
            const {headers, server} = require("../config.json");
            const { decodeGJGauntlet } = require("../misc/decodeGJGauntlet.js")

            const data = {
                secret: "Wmfd2893gb7",
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0
            }

            let res = await axios.post(server + "getGJGauntlets21.php", data, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data);
            })

            let gauntlets = res.data.split("|");
            let result = [];
            gauntlets.forEach(g => {
                result.push(decodeGJGauntlet(g));
            })

            return result;
        }
}