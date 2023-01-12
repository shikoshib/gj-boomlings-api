module.exports = {
    getMapPacks:
        async function(page = 1) {
            const { decodeMapPack } = require("../misc/decodeMapPack.js");

            const axios = require("axios");
            const { headers, server } = require("../config.json");
            const data = {
                secret: "Wmfd2893gb7",
                page: Number(page) - 1
            }

            let res = await axios.post(server + "getGJMapPacks21.php", data, {
                headers: headers
            }).catch(e => {
                if(e.response.data == -1) throw new Error("-1 Not found.");
                throw new Error(e.response.data);
            })

            let packs = res.data.split("|");
            let result = [];
            packs.forEach(p => {
                result.push(decodeMapPack(p));
            })

            return result;
        }
}