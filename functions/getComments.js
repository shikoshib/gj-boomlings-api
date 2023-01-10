module.exports = {
    getComments:
        async function(level, page = 1, mode = 1) {
            if(!level || level == "") throw new Error("Please provide a level ID!");
            if(isNaN(level)) throw new Error("A level ID should be a number.");
            const axios = require("axios");
            const {headers, server} = require("../config.json");
            const { decodeGJComment } = require("../misc/decodeGJComment.js");

            const data = {
                levelID: level,
                page: page - 1,
                mode: mode,
                secret: "Wmfd2893gb7",
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0
            }

            let res = await axios.post(server + "getGJComments21.php", data, {
                headers: headers
            }).catch(e => {
                if(e.response.data == -1) throw new Error("-1 This user is not found.");
                throw new Error(e.response.data);
            })
            
            let comments = res.data.split("|");
            let result = [];
            comments.forEach(c => {
                result.push(decodeGJComment(c));
            })

            return result;
        }
}