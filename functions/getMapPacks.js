module.exports = {
    getMapPacks:
        async function(page = 1) {
            const { decodeMapPack } = require("../misc/decodeMapPack.js");

            const {gjReq} = require("../misc/gjReq.js");
            const data = {
                secret: "Wmfd2893gb7",
                page: Number(page) - 1
            }

            let res = await gjReq("getGJMapPacks21", data);
            if(res.data.startsWith("#")) throw new Error("-1 Not found.");

            let packs = res.data.split("|");
            let result = [];
            packs.forEach(p => {
                result.push(decodeMapPack(p));
            })

            return result;
        }
}