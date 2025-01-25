module.exports = {
    /**
     * Fetches levels by a user.
     * @param {string} username - The search query (username or player ID).
     * @param {number} page - The page to search through. Defaults to 1.
     * @returns {import("./getLevelByID").Level[]}
     */
    getUserLevels: async function (username, page = 1) {
        if (!username) throw new Error("Please provide a username or player ID!");

        const { gjReq } = require("../gjReq.js");
        let GJDecode = require("../misc/GJDecode.js");
        const { decodeSearchResults } = new GJDecode;
        let playerID=username;
        if (isNaN(username)) {
            let search = await gjReq("getGJUsers20", {
                str: username,
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