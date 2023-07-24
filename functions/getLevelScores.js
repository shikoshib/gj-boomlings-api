module.exports = {
    /**
     * Gets the leaderboard on a level.
     * 
     * For some reason, Geometry Dash API requires the login information.
     * @param {*} lvl - The level ID.
     * @param {*} type - The leaderboard type. Possible types: `"week"`, `"top"`, `"friends"`.
     * @param {*} str - The username or a player ID.
     * @param {*} pass - The password.
     */
    getLevelScores:
        async function(lvl, type, str, pass){
            let types = {"week":"2","top":"1","friends":"0"}
            if(!lvl) throw new Error("Please provide a level ID!");
            if(!types[type.toLowerCase()]) throw new Error("Please provide a valid leaderboard type! Possible types: \"week\", \"top\", \"friends\".")
            if(!str) throw new Error("Please provide a username or a Player ID!");
            if(!pass) throw new Error("Please provide a password!");

            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { secret } = require("../config.json");
            
            const { searchUsers } = require("./searchUsers.js");
            let user = await searchUsers(str);

            let GJDecode = require("../misc/GJDecode.js");
            const {gjp} = require("../misc/gjp.js");

            let {decodeScore} = new GJDecode();

            const data = {
                accountID: user.accountID,
                gjp: gjp(pass),
                levelID: lvl,
                secret: secret,
                type: types[type.toLowerCase()]
            }

            let res = await gjReq("getGJLevelScores211", data);

            let scores = res.data.split("|");
            let result = [];

            scores.forEach(s =>{
                result.push(decodeScore(s));
            })

            return result;
        }
}