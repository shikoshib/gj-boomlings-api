module.exports = {
    /**
     * Gets the gauntlets.
     */
    getGauntlets: 
        async function() {
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            let GJDecode = require("../misc/GJDecode.js");
            const { decodeGJGauntlet } = new GJDecode();

            const data = {
                secret: "Wmfd2893gb7"
            }

            let res = await gjReq("getGJGauntlets21", data)
            if(res.data == "error code: 1005") {
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