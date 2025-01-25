module.exports = {
    /**
     * Searches for levels.
     * @param {string} query - The search query.
     * @param {number} page - The page to search through. Defaults to 1.
     * @returns {import("./getLevelByID").Level[]}
     */
    searchLevels: async function (query, page = 1) {
        const { gjReq } = require("../gjReq");
        let GJDecode = require("../misc/GJDecode");
        const { decodeSearchResults } = new GJDecode;

        let res = await gjReq("getGJLevels21", {
            type: 0,
            str: query,
            page: Number(page) - 1,
            secret: "Wmfd2893gb7"
        });
        if (res.data == -1) return [];

        return decodeSearchResults(res.data);
    }
}