module.exports = {
    /**
     * Gets the list of account posts of a specified user.
     * @param {*} str - The user's name.
     * @param {*} page - The page.
     */
    getAccountPosts:
        async function(str, page = 1) {
            if(!str) throw new Error("Please provide a user ID or name!");
            let GJDecode = require("../misc/GJDecode.js");
            const { decodeAccountPost } = new GJDecode();
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(str);

            let ACdata = {
                accountID: user.accountID,
                secret: "Wmfd2893gb7",
                page: page - 1
            };

            let res = await gjReq("getGJAccountComments20", ACdata);
            if(res.data == -1) throw new Error("-1 Not found.");
            if(res.data.startsWith("#")) throw new Error("Whoops! Couldn't find anything!");

            if(res.data == "error code: 1005") {
                res = await gjWReq("getAccountPosts", `${str}?page=${page}`);
                if(res.status == 403) throw new Error(res.data.error);
                return res.data;
            }
            
            let accPosts = res.data.split("|");
            let result = [];
            accPosts.forEach(p => {
                result.push(decodeAccountPost(p));
            })

            return result;
        }
}