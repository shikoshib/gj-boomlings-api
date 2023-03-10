module.exports = {
    getProfile:
        async function(str) {
            if(!str) throw new Error("Please provide a user ID or name!");
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(str);

            let data = {
                targetAccountID: user.accountID,
                secret: "Wmfd2893gb7"
            };

            let res = await gjReq("getGJUserInfo20", data);
            if(res.data == -1) throw new Error("-1 This user is not found.");

            if(res.data.startsWith("error code")) {
                res = await gjWReq("getProfile", str);
                if(res.status == 403) throw new Error(res.data.error);
                return res.data;
            }

            let spl = res.data.split(':');
            let userInfo = [];
            for(let i =0;i<spl.length;i++) {
              if(i%2!=0) {
                userInfo.push(spl[i-1]+`:`+spl[i]);
              }
            }

            let username = userInfo[0].split("1:")[1];
            let playerID = userInfo[1].split("2:")[1];
            let goldCoins = userInfo[2].split("13:")[1];
            let silverCoins = userInfo[3].split("17:")[1];
            let p1col = userInfo[4].split("10:")[1];
            let p2col = userInfo[5].split("11:")[1];
            let stars = userInfo[6].split("3:")[1];
            let diamonds = userInfo[7].split("46:")[1];
            let demons = userInfo[8].split("4:")[1];
            let cps = userInfo[9].split("8:")[1];         // clicks per second lmao
            let msgState = userInfo[10].split("18:")[1];
            let friendsState = userInfo[11].split("19:")[1];
            let commentHistoryState = userInfo[12].split("50:")[1];
            let youtube = userInfo[13].split("20:")[1];
            let rank = userInfo[23].split("30:")[1];
            let accountID = userInfo[24].split("16:")[1];
            let twitter = userInfo[26].split("44:")[1];
            let twitch = userInfo[27].split("45:")[1];
            let modState = userInfo[28].split("49:")[1];

            let ytLnk = youtube != "" ? `https://youtube.com/channel/${youtube}` : null;
            let twitterLnk = twitter != "" ? `https://twitter.com/${twitter}` : null;
            let twitchLnk = twitch != "" ? `https://twitch.tv/${twitch}` : null;

            if(youtube.endsWith("123")) ytLnk = `https://youtube.com/channel/${youtube.split("123")[0]}`;
            if(twitter.endsWith("123")) twitterLnk = `https://twitter.com/${twitter.split("123")[0]}`;
            if(twitch.endsWith("123")) twitchLnk = `https://twitch.tv/${twitch.split("123")[0]}`;

            let msgStateDecoding = {
                "0": "all",
                "1": "friends",
                "2": "none"
            }

            let stateBinaryDecoding = {
                "0": "all",
                "1": "none"
            }

            let modDecoding = {
                "0": "none",
                "1": "mod",
                "2": "elder"
            }

            let colors = require("../misc/colors.json");
            const { rgbToHEX } = require("../misc/rgbToHEX.js");

            const result = {
                username: username,
                playerID: Number(playerID),
                accountID: Number(accountID),
                rank: Number(rank),
                color1: rgbToHEX(colors[p1col]),
                color2: rgbToHEX(colors[p2col]),
                stars: Number(stars),
                diamonds: Number(diamonds),
                secretCoins: Number(goldCoins),
                userCoins: Number(silverCoins),
                demons: Number(demons),
                creatorPoints: Number(cps),
                messages: msgStateDecoding[msgState],
                friendRequests: stateBinaryDecoding[friendsState],
                commentHistory: msgStateDecoding[commentHistoryState],
                mod: modDecoding[modState],
                youtube: ytLnk,
                twitter: twitterLnk,
                twitch: twitchLnk
            }
            
            return result;
        }
}