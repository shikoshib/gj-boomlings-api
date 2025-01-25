module.exports = {
    /**
     * Fetches the list of top lists.
     * @param {number} page - The page to search through. Defaults to 1.
     * @returns {import("./searchLists").List[]}
     */
    getTopLists: async function (page = 1) {
        const { gjReq } = require("../gjReq");
        const GJDecode = require("../misc/GJDecode");
        const { decodeLists } = new GJDecode;
        const res = await gjReq("getGJLevelLists", {
            type: 6,
            secret: "Wmfd2893gb7",
            page: Number(page) - 1
        })
        if (res.data == -1) return [];
        return decodeLists(res.data);
    }
}