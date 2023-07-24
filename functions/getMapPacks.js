module.exports = {
    /**
     * Gets the map pack list.
     * @param {*} page - The page.
     */
    getMapPacks:
        async function(page = 1) {
            let GJDecode = require("../misc/GJDecode.js");
            const { decodeMapPack } = new GJDecode();

            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const data = {
                secret: "Wmfd2893gb7",
                page: Number(page) - 1
            }

            let res = await gjReq("getGJMapPacks21", data);
            if(res.data.startsWith("#")) throw new Error("-1 Not found.");

            if(res.data == "error code: 1005") {
                res = await gjWReq("getMapPacks", page);
                if(res.status == 403) throw new Error(res.data.error);
                return res.data;
            }

            let packs = res.data.split("|");
            let result = [];
            packs.forEach(p => {
                result.push(decodeMapPack(p));
            })

            return result;
        }
}