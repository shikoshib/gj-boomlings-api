module.exports = {
    getFriendsList: async function (user, pass) {
        if (!user) throw new Error("Please provide a player ID or username!");
        if (!pass) throw new Error("Please provide a password!");

        const { gjReq } = require("../gjReq");
        const XOR = require("../xor");
        const xor = new XOR;

        let search = await gjReq("getGJUsers20", {
            str: user,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) return [];
        let accID = search.data.split(":")[21];

        const data = {
            accountID: accID,
            gjp: xor.encrypt(pass, 37526),
            secret: "Wmfd2893gb7"
        }

        let res = await gjReq("getGJUserList20", data);
        if (res.data == -1 || res.data == -2) return [];

        let players = res.data.split("|");
        let result = [];

        let colors = require("../misc/colors.json");
        const { rgbToHEX } = require("../misc/rgbToHEX");

        players.forEach(p => {
            let s=p.split(":");
            let username = s[1];
            let playerID = s[3];
            let p1 = s[7];
            let p2 = s[9];
            let accID = s[15];
            let msg = s[17];

            let msgObj = {
                "0": "all",
                "1": "friends",
                "2": "none"
            }

            result.push({
                username: username,
                playerID: Number(playerID),
                accountID: Number(accID),
                color1: rgbToHEX(colors[p1]),
                color2: rgbToHEX(colors[p2]),
                messages: msgObj[msg]
            })
        })

        return result;
    }
}