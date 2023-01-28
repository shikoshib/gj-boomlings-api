module.exports = {
    deleteLevel:
        async function(lvl, str, password) {
            if(!lvl || lvl == "") throw new Error("Please provide a level ID!");
            if(!str || str == "") throw new Error("Please provide a user ID or name!");
            if(!password || password == "") throw new Error("Please provide a password!");

            const {gjReq} = require("../misc/gjReq.js");
            const { searchUsers } = require("./searchUsers.js");
            const {gjp} = require("../misc/gjp.js");

            let user = await searchUsers(str);

            let data = {
                accountID: user.accountID,
                secret: "Wmfv2898gc9",
                levelID: lvl,
                gjp: gjp(password),
            };

            let res = await gjReq("deleteGJLevelUser20", data);
            if(res.data == -1) throw new Error(-1);

            return 1;
        }
}