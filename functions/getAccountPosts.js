module.exports = {
    getAccountPosts:
        async function(str, page = 1) {
            if(!str || str == "") throw new Error("Please provide a user ID or name!");
            const { decodeAccountPost } = require("../misc/decodeAccountPost.js");
            const {gjReq} = require("../misc/gjReq.js");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(str);

            let ACdata = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                accountID: user.accountID,
                secret: "Wmfd2893gb7",
                page: page - 1
            };

            let res = await gjReq("getGJAccountComments20", ACdata);
            if(res.data == -1) throw new Error("-1 Not found.");
            if(res.data.startsWith("#")) throw new Error("Whoops! Couldn't find anything!");
            
            let accPosts = res.data.split("|");
            let result = [];
            accPosts.forEach(p => {
                result.push(decodeAccountPost(p));
            })

            return result;
        }
}