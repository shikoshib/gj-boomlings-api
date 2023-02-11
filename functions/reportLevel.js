module.exports = {
    reportLevel:
        async function(level) {
            if(!level) throw new Error("Please provide a level ID.");
            if(isNaN(Number(level))) throw new Error("The level ID should be a number.");

            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");

            const data = {
                levelID: level.toString().trim(),
                secret: "Wmfd2893gb7"
            }

            let res = await gjReq("reportGJLevel", data);
            if(res.data.startsWith("error code")) res = await gjWReq("reportLevel", id);

            return res.data;
        }
}