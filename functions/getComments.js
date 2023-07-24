module.exports = {
    /**
     * Gets the comments from a specified level.
     * @param {*} level - The level ID to get the comments from.
     * @param {*} page - The page.
     * @param {*} mode - The mode of fetching the comments. `0` is for recent, `1` is for most liked.
     */
    getComments:
        async function(level, page = 1, mode = 1) {
            if(!level) throw new Error("Please provide a level ID!");
            if(isNaN(level)) throw new Error("A level ID should be a number.");
            if(mode && isNaN(mode)) throw new Error("Please provide a mode ID! 0 for recent, 1 for most liked.");

            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            let GJDecode = require("../misc/GJDecode.js");
            const { decodeGJComment } = new GJDecode();

            const data = {
                levelID: level,
                page: Number(page) - 1,
                mode: Number(mode),
                secret: "Wmfd2893gb7",
            }

            let res = await gjReq("getGJComments21", data);
            if(res.data.startsWith("#")) throw new Error("-1 No comments have been found.");

            if(res.data == "error code: 1005") {
                res = await gjWReq("getComments", `${level}?page=${page}&mode=${mode}`);
                if(res.status == 403) throw new Error(res.data.error);
                return res.data;
            }
            
            let comments = res.data.split("|");
            let result = [];
            comments.forEach(c => {
                result.push(decodeGJComment(c));
            })

            return result;
        }
}