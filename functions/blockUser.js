module.exports = {
    blockUser:
        async function(target, username, password) {
            if(!target) throw new Error("Please provide a target's player ID or username!");
            if(!username) throw new Error("Please provide your player ID or username!");
            if(!password) throw new Error("Please provide your password!");

            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(username);
            let targetObj = await searchUsers(target);

            const {gjp} = require("../misc/gjp.js");

            const data = {
                secret: "Wmfd2893gb7",
                targetAccountID: targetObj.accountID,
                accountID: user.accountID,
                gjp: gjp(password)
            }

            let res = await gjReq("blockGJUser20", data);
            if(res.data == -1) throw new Error(-1);

            if(res.data.startsWith("error code")) res = await gjWReq("blockUser", `${target}?user=${username}&password=${password}`);
            if(res.status == 403) throw new Error(res.data.error);

            return 1;
        }
}