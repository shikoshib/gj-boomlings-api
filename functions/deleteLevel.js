module.exports = {
    /**
     * Deletes the specified level.
     * @param {*} lvl - The ID of a level to delete.
     * @param {*} str - The username or player ID of a creator.
     * @param {*} password - The password of a creator.
     */
    deleteLevel:
        async function(lvl, str, password) {
            if(!lvl) throw new Error("Please provide a level ID!");
            if(!str) throw new Error("Please provide a user ID or name!");
            if(!password) throw new Error("Please provide a password!");

            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
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

            if(res.data == "error code: 1005") res = await gjWReq("deleteLevel", `${lvl}?user=${str}&password=${password}`);
            if(res.status == 403) throw new Error(res.data.error);

            return res.data;
        }
}