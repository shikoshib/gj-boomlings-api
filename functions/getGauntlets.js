module.exports = {
    getGauntlets: 
        async function() {
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { decodeGJGauntlet } = require("../misc/decodeGJGauntlet.js")

            const data = {
                secret: "Wmfd2893gb7"
            }

            let res = await gjReq("getGJGauntlets21", data)
            if(res.data.startsWith("error code")) {
                res = await gjWReq("getGauntlets");
                return res.data;
            }

            let gauntlets = res.data.split("|");
            let result = [];
            gauntlets.forEach(g => {
                result.push(decodeGJGauntlet(g));
            })

            return result;
        }
}