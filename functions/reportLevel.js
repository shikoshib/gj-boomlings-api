module.exports = {
    /**
     * Reports a level.
     * @param {number} level - The level ID.
     * @returns {1} - Always returns 1, regardless of whether the level was reported or not.
     */
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