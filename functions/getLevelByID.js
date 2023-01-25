module.exports = {
    getLevelByID:
        async function(id) {
            if(!id || id == "") throw new Error("Please provide a level ID!");
            if(isNaN(id)) throw new Error("The level ID should be a number!");

            const {decodeLevel} = require("../misc/decodeLevel.js");
            const {gjReq} = require("../misc/gjReq.js");
            const {secret} = require("../config.json");

            const data = {
                secret: secret,
                str: id,
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                type: 0
            }

            let res = await gjReq("getGJLevels21", data);
            if(res.data == -1) throw new Error("-1 Not found.");

            return await decodeLevel(res.data);
        }
}