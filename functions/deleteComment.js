module.exports = {
    deleteComment:
        async function(id, lvl, str, password) {
            if(!id || id == "") throw new Error("Please provide a comment ID!");
            if(!lvl || lvl == "") throw new Error("Please provide a level ID!");
            if(!str || str == "") throw new Error("Please provide a user ID or name!");
            if(!password || password == "") throw new Error("Please provide a password!");

            const axios = require("axios");
            const { headers, server } = require("../config.json");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(str);

            const XOR = require("../misc/xor.js");
            const xor = new XOR();

            let dACdata = {
                accountID: user.accountID,
                secret: "Wmfd2893gb7",
                levelID: lvl,
                gjp: xor.encrypt(password, 37526),
                commentID: id,
            };

            let res = await axios.post(server + "deleteGJComment20.php", dACdata, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data);
            })

            return 1;
        }
}