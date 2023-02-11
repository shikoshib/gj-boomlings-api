module.exports = {
    getLevelByID:
        async function(id) {
            if(!id) throw new Error("Please provide a level ID!");
            if(isNaN(id)) throw new Error("The level ID should be a number!");

            const {decodeLevel} = require("../misc/decodeLevel.js");
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const {secret} = require("../config.json");

            const data = {
                secret: secret,
                str: id,
                type: 0
            }

            let res = await gjReq("getGJLevels21", data);
            if(res.data == -1) throw new Error("-1 Not found.");

            if(res.data.startsWith("error code")) {
                res = await gjWReq("getLevelByID", id);
                if(res.status == 403) throw new Error(res.data.error);
                return res.data;
            }

            return await decodeLevel(res.data);
        }
}