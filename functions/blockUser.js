module.exports = {
    blockUser:
        async function(target, username, password) {
            if(!target || target == "") throw new Error("Please provide a target's player ID or username!");
            if(!username || username == "") throw new Error("Please provide your player ID or username!");
            if(!password || password == "") throw new Error("Please provide your password!");

            const {gjReq} = require("../misc/gjReq.js");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(username);
            let targetObj = await searchUsers(target);

            const {gjp} = require("../misc/gjp.js");

            const data = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                secret: "Wmfd2893gb7",
                targetAccountID: targetObj.accountID,
                accountID: user.accountID,
                gjp: gjp(password)
            }

            let res = await gjReq("blockGJUser20", data);

            return 1;
        }
}