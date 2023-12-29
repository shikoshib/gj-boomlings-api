module.exports = {
    getLevelScores: async function (lvl, type, user, pass) {
        let types = { week: "2", top: "1", friends: "0" }
        if (!lvl) throw new Error("Please provide a level ID!");
        if (!types[type.toLowerCase()]) throw new Error("Please provide a valid leaderboard type! Possible types: \"week\", \"top\", \"friends\".")
        if (!user) throw new Error("Please provide a username or a Player ID!");
        if (!pass) throw new Error("Please provide a password!");

        const { gjReq } = require("../gjReq.js");
        const { rgbToHEX } = require("../misc/rgbToHEX");
        const colors = require("../misc/colors.json");
        let search = await gjReq("getGJUsers20", {
            str: user,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) return [];
        let accID = search.data.split(":")[21];

        const XOR = require("../xor.js");
        const xor = new XOR;

        const data = {
            accountID: accID,
            gjp: xor.encrypt(pass, 37526),
            levelID: lvl,
            secret: "Wmfd2893gb7",
            type: types[type.toLowerCase()]
        }

        let res = await gjReq("getGJLevelScores211", data);

        let scores = res.data.split("|");
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

        scores.forEach(sc => {
            let s = sc.split(":");
            result.push({
                username: s[1],
                playerID: Number(s[3]),
                accountID: Number(s[15]),
                rank: Number(s[19]),
                c1: rgbToHEX(colors[user[7]]),
                c2: rgbToHEX(colors[user[9]]),
                iconID: Number(s[5]),
                iconType: iconObj[s[11]],
                glow: s[13] == "2" ? true : false,
                percent: Number(s[17]),
                coins: Number(s[21]),
                age: s[23]
            })
        })

        return result;
    }
}