module.exports = {
    getLevelByID: async function (id) {
        if (isNaN(id)) throw new Error("Please provide a valid level ID!");
        const { gjReq } = require("../gjReq");
        const GJDecode = require("../misc/GJDecode");
        const { decodeSearchResults } = new GJDecode;
        const res = await gjReq("getGJLevels21", {
            secret: "Wmfd2893gb7",
            str: id,
            type: 0
        });
        if (res.data == -1) return {};
        return decodeSearchResults(res.data)[0];
    }
}