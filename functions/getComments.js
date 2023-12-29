module.exports = {
    getComments:
        async function (level, page = 1, mode = 1) {
            if (isNaN(level)) throw new Error("Please provide a valid level ID!");
            if (mode && isNaN(mode)) throw new Error("Please provide a mode ID! 0 for recent, 1 for most liked.");

            const { gjReq } = require("../gjReq");
            const { rgbToHEX } = require("../misc/rgbToHEX");
            const colors = require("../misc/colors.json");

            let res = await gjReq("getGJComments21", {
                levelID: level,
                page: Number(page) - 1,
                mode: Number(mode),
                secret: "Wmfd2893gb7"
            });
            if (res.data == -1 || res.data.startsWith("#")) return [];

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
                    content: Buffer.from(comment[1], "base64").toString(),
                    playerID: Number(comment[3]),
                    likes: Number(comment[5]),
                    disliked: comment[5] < 0 ? true : false,
                    percent: Number(comment[9]),
                    id: Number(comment[13]),
                    age: comment[11],
                    username: user[1],
                    iconID: Number(user[3]),
                    c1: rgbToHEX(colors[user[5]]),
                    c2: rgbToHEX(colors[user[7]]),
                    iconType: iconObj[user[9]],
                    glow: Boolean(Number(user[11])),
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