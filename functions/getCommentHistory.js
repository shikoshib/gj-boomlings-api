module.exports = {
    getCommentHistory:
        async function(str, page = 1, mode = 1) {
            if(!str || str == "") throw new Error("Please provide a player ID or name!");
            const axios = require("axios");
            const {headers, server} = require("../config.json");
            const {decCommentFromHistory} = require("../misc/decCommentFromHistory.js");
            const {getProfile} = require("./getProfile.js");

            const userData = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: str,
                secret: "Wmfd2893gb7"
            }

            let r = await axios.post(server + "getGJUsers20.php", userData, {
                headers: headers
            }).catch(e => {
                if(e.response.data == -1) throw new Error("-1 This user is not found.");
                throw new Error(e.response.data);
            })

            let id = r.data.split(":2:")[1].split(":13:")[0];

            const user = await getProfile(id);
            if(user.commentHistory != "all") throw new Error("Whoops! This user has disabled viewing his comment history!")

            const CHData = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                secret: "Wmfd2893gb7",
                userID: id,
                page: page - 1,
                mode: 1
            }

            let res = await axios.post(server + "getGJCommentHistory.php", CHData, {
                headers: headers
            }).catch(e => {
                if(e.response.data == -1) throw new Error("-1 Not found.");
                throw new Error(e.response.data);
            })
            
            let comments = res.data.split("|");
            let result = [];
            comments.forEach(c => {
                result.push(decCommentFromHistory(c));
            })

            return result;
        }
}