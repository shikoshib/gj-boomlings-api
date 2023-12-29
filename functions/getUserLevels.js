module.exports = {
    getUserLevels: async function (str, page = 1) {
        if (!str) throw new Error("Please provide a username or player ID!");

        const { gjReq } = require("../gjReq.js");
        let GJDecode = require("../misc/GJDecode.js");
        const { decodeSearchResults } = new GJDecode;
        let playerID=str;
        if (isNaN(str)) {
            let search = await gjReq("getGJUsers20", {
                str: str,
                secret: "Wmfd2893gb7"
            });
            if (search.data == -1) return [];
            playerID = search.data.split(":")[3];
        }

        const res = await gjReq("getGJLevels21", {
            type: 5,
            str: playerID,
            secret: "Wmfd2893gb7",
            page: Number(page) - 1
        });
        if (res.data == -1) return [];
        return decodeSearchResults(res.data);
    }
}