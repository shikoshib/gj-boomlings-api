module.exports = {
    getGauntlets: 
        async function() {
            const {gjReq} = require("../misc/gjReq.js");
            const { decodeGJGauntlet } = require("../misc/decodeGJGauntlet.js")

            const data = {
                secret: "Wmfd2893gb7",
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0
            }

            let res = await gjReq("getGJGauntlets21", data)

            let gauntlets = res.data.split("|");
            let result = [];
            gauntlets.forEach(g => {
                result.push(decodeGJGauntlet(g));
            })

            return result;
        }
}