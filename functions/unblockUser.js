module.exports = {
    unblockUser:
        async function(target, username, password) {
            if(!target || target == "") throw new Error("Please provide a target's player ID or username!");
            if(!username || username == "") throw new Error("Please provide your player ID or username!");
            if(!password || password == "") throw new Error("Please provide your password!");
            const axios = require("axios");
            const {headers, server} = require("../config.json");
            const { searchUsers } = require("./searchUsers.js");
            
            let user = await searchUsers(username);
            let target = await searchUsers(target);

            const {gjp} = require("../misc/gjp.js");
            
            const blockData = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                secret: "Wmfd2893gb7",
                targetAccountID: target.accountID,
                accountID: user.accountID,
                gjp: gjp(password)
            }

            let res = await axios.post(server + "unblockGJUser20.php", blockData, {
                headers: headers
            }).catch(e => {
                if(res.data.toString().toLowerCase() == "error code: 1020") throw new Error("1020 error: Request denied.");
                throw new Error(e)
            })

            return 1;
        }
}