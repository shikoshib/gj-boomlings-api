module.exports = {
    getCommentHistory: async function (str, page = 1, mode = 1) {
        if (!str) throw new Error("Please provide a player ID or name!");
        if (page && isNaN(page)) throw new Error("Please provide a page!");
        if (mode && isNaN(mode)) throw new Error("Please provide a valid mode ID! 0 for recent, 1 for most liked.");

        const { gjReq } = require("../gjReq.js");
        const { getProfile } = require("./getProfile.js");
        const { rgbToHEX } = require("../misc/rgbToHEX");
        const colors = require("../misc/colors.json");

        const user = await getProfile(str);
        if (user.commentHistory != "all") throw new Error("Whoops! This user has disabled viewing his comment history!");

        let res = await gjReq("getGJCommentHistory", {
            secret: "Wmfd2893gb7",
            userID: user.playerID,
            page: Number(page) - 1,
            mode: Number(mode)
        });
        if (res.data == -1) return [];

        let comments = res.data.split("#")[0].split("|");
        let result = [];

        let iconObj = {
            0: "cube",
            1: "ship",
            2: "ball",
            3: "ufo",
            4: "wave",
            5: "robot",
            6: "spider",
            7: "swing",
            8: "jetpack"
        }

        comments.forEach(c => {
            let comment = c.split(":")[0].split("~");
            let user = c.split(":")[1].split("~");
            let obj = {
                levelID: Number(comment[3]),
                content: Buffer.from(comment[1], "base64").toString(),
                likes: Number(comment[7]),
                disliked: comment[7] < 0 ? true : false,
                percent: Number(comment[9]),
                id: Number(comment[13]),
                age: comment[11],
                username: user[1],
                iconID: Number(user[3]),
                c1: rgbToHEX(colors[user[5]]),
                c2: rgbToHEX(colors[user[7]]),
                iconType: iconObj[user[9]],
                glow: Boolean(Number(user[11])),
                playerID: Number(comment[5]),
                accountID: Number(user[13])
            };
            if (comment.length > 14) {
                obj.mod = comment[15] == "1" ? "mod" : "elder";
                obj.color = rgbToHEX(comment[17]);
            }
            result.push(obj);
        })

        return result;
    }
}