module.exports = {
    getCommentHistory:
        async function(str, page = 1, mode = 1) {
            if(!str) throw new Error("Please provide a player ID or name!");
            if(page && isNaN(page)) throw new Error("Please provide a page!");
            if(mode && isNaN(mode)) throw new Error("Please provide a mode ID! 0 for recent, 1 for most liked.");

            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const {decCommentFromHistory} = require("../misc/decCommentFromHistory.js");
            const {getProfile} = require("./getProfile.js");
            
            const user = await getProfile(str);
            if(user.commentHistory != "all") throw new Error("Whoops! This user has disabled viewing his comment history!");

            const CHData = {
                secret: "Wmfd2893gb7",
                userID: user.playerID,
                page: Number(page) - 1,
                mode: Number(mode)
            }

            let res = await gjReq("getGJCommentHistory", CHData);
            if(res.data == -1) throw new Error("-1 Not found.");

            if(res.data.startsWith("error code")) {
                res = await gjWReq("getCommentHistory", `${str}?page=${page}&mode=${mode}`);
                if(res.status == 403) throw new Error(res.data.error);
                return res.data;
            }
            
            let comments = res.data.split("|");
            let result = [];
            comments.forEach(c => {
                result.push(decCommentFromHistory(c));
            })

            return result;
        }
}