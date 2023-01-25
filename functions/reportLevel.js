module.exports = {
    reportLevel:
        async function(level) {
            if(!level || level == "") throw new Error("Please provide a level ID.");
            if(isNaN(Number(level))) throw new Error("The level ID should be a number.");

            const {gjReq} = require("../misc/gjReq.js");

            const data = {
                levelID: level.toString().trim(),
                secret: "Wmfd2893gb7"
            }

            let res = await gjReq("reportGJLevel", data);

            return res.data;
        }
}