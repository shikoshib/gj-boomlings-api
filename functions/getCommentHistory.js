module.exports = {
    getCommentHistory:
        async function(str, page = 1, mode = 1) {
            if(!str || str == "") throw new Error("Please provide a player ID or name!");
            const axios = require("axios");
            const {headers, server} = require("../config.json");
            const {decCommentFromHistory} = require("../misc/decCommentFromHistory.js");
            const {getProfile} = require("./getProfile.js");
            
            const user = await getProfile(str);
            if(user.commentHistory != "all") throw new Error("Whoops! This user has disabled viewing his comment history!")

            const CHData = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                secret: "Wmfd2893gb7",
                userID: user.playerID,
                page: page - 1,
                mode: 1
            }

            let res = await axios.post(server + "getGJCommentHistory.php", CHData, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data);
            })

            if(res.data == -1) throw new Error("-1 Not found.");
            
            let comments = res.data.split("|");
            let result = [];
            comments.forEach(c => {
                result.push(decCommentFromHistory(c));
            })

            return result;
        }
}