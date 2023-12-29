module.exports = {
    reportLevel: async function (level) {
        if (isNaN(level)) throw new Error("Please provide a valid level ID.");
        const { gjReq } = require("../gjReq");

        let res = await gjReq("reportGJLevel", {
            levelID: level,
            secret: "Wmfd2893gb7"
        });

        return res.data;
    }
}