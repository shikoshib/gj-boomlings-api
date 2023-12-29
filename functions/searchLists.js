module.exports = {
    searchLists: async function (query, page = 1) {
        const { gjReq } = require("../gjReq");
        const GJDecode = require("../misc/GJDecode");
        const { decodeLists } = new GJDecode;
        const res = await gjReq("getGJLevelLists", {
            type: 0,
            str: query,
            secret: "Wmfd2893gb7",
            page: Number(page) - 1
        })
        if (res.data == -1) return [];
        return decodeLists(res.data);
    }
}