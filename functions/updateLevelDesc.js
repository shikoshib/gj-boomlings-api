module.exports = {
    /**
     * Updates the level description.
     * @param {*} level - The level ID.
     * @param {*} d - The level's new description.
     * @param {*} user - The level creator's player ID or name.
     * @param {*} password - The level creator's password.
     */
    updateLevelDesc: 
        async function(level, d, user, password) {
            let desc = d;

            if(!level) throw new Error("Please provide a level ID!");
            if(Number(level) == NaN) throw new Error("A level ID must be a number!");
            if(!desc) desc = "(No description provided)";
            if(!user) throw new Error("Please provide a user ID or name!");
            if(!password) throw new Error("Please provide a password!");

            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { secret } = require("../config.json");
            const { searchUsers } = require("./searchUsers.js");

            let userObj = await searchUsers(user);

            const { gjp } = require("../misc/gjp.js");
            const { encB64 } = require("../misc/encB64.js");

            const uLDdata = {
                accountID: userObj.accountID,
                gjp: gjp(password),
                levelID: level,
                levelDesc: encB64(desc),
                secret: secret
            }

            let res = await gjReq("updateGJDesc20", uLDdata);
            if(res.data == -1) throw new Error("-1 Failed to update the description.");

            if(res.data == "error code: 1005") res = await gjWReq("updateLevelDesc", `${level}?content=${encB64(desc)}&user=${user}&password=${password}`);
            if(res.status == 403) throw new Error(res.data.error);

            return res.data;
        }
}