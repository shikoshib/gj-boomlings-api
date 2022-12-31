module.exports = {
    getProfile:
        async function(str) {
            if(!str || str == "") throw new Error("Please provide a user ID or name!");
            const axios = require("axios");
            const { headers, server } = require("../config.json");

            const data = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: str,
                secret: "Wmfd2893gb7"
            };

            let r = await axios.post(server + "getGJUsers20.php", data, {
                headers: headers
            })

            let id = r.data.split(":16:")[1].split(":3:")[0];
            if(Number(id) < 71 || id.includes(":")) id = r.data.split(":16:")[2].split(":3:")[0];

            let GJUI20data = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                targetAccountID: id,
                secret: "Wmfd2893gb7"
            };

            let res = await axios.post(server + "getGJUserInfo20.php", GJUI20data, {
                headers: headers
            })
            
            if(res.data == -1) throw new Error("-1 Not found.")
            if(res.data.toLowerCase() == "error code: 1020") throw new Error("1020 error: Request denied.");
            if(res.data.toLowerCase() == "error code: 1005") throw new Error("1005 error: Your IP address has been blocked from sending requests to a server. It's recommended to use locally (directly from a PC).")

            let dataWoSkins = `${res.data.split("21:")[0]}${res.data.split(":48:")[1]}`;

            let username = dataWoSkins.split("1:")[1].split(":2:")[0];
            let playerID = dataWoSkins.split(":2:")[1].split(":13:")[0];
            let goldCoins = dataWoSkins.split(":13:")[1].split(":17:")[0];
            let silverCoins = dataWoSkins.split(":17:")[1].split(":10:")[0];
            let stars = dataWoSkins.split(":3:")[1].split(":46:")[0];
            let diamonds = dataWoSkins.split(":46:")[1].split(":4:")[0];
            let demons = dataWoSkins.split(":4:")[1].split(":8:")[0];
            let cps = dataWoSkins.split(":8:")[1].split(":18:")[0];         // clicks per second lmao
            let msgState = dataWoSkins.split(":18:")[1].split(":19:")[0];
            let friendsState = dataWoSkins.split(":19:")[1].split(":50:")[0];
            let commentHistoryState = dataWoSkins.split(":50:")[1].split(":20:")[0];
            let youtube = dataWoSkins.split(":20:")[1].split(":")[0];
            let rank = dataWoSkins.split(":30:")[1].split(":16:")[0];
            let accountID = dataWoSkins.split(":16:")[1].split(":31:")[0];
            let twitter = dataWoSkins.split(":44:")[1].split(":45:")[0];
            let twitch = dataWoSkins.split(":45:")[1].split(":49:")[0];
            let modState = dataWoSkins.split(":49:")[1].split(":29:")[0];

            if(youtube.includes(":")) youtube = dataWoSkins.split(":20:")[1].split(":")[0];
            if(twitter.includes(":")) twitter = dataWoSkins.split(":44:")[2].split(":45:")[0];
            if(twitch.includes(":")) twitch = dataWoSkins.split(":45:")[2].split(":49:")[0];
            if(goldCoins.includes(":")) goldCoins = dataWoSkins.split(":13:")[2].split(":17:")[0];
            if(goldCoins == "") goldCoins = dataWoSkins.split(":13:")[1].split(":17:")[1];
            if(silverCoins.includes(":")) silverCoins = dataWoSkins.split("17:")[2].split(":10:")[0];
            if(rank.includes(":")) rank = dataWoSkins.split(":30:")[2].split(":16:")[0];
            if(accountID.includes(":")) accountID = dataWoSkins.split(":16:")[2].split(":31:")[0];
            if(demons.includes(":")) demons = dataWoSkins.split(":4:")[2].split(":8:")[0];
            if(msgState.includes(":")) msgState = dataWoSkins.split(":18:")[2].split(":19:")[0];
            if(stars.includes(":")) stars = dataWoSkins.split("3:")[2].split(":46:")[0];
            if(modState.includes(":")) modState = dataWoSkins.split(":49:")[2].split(":29:")[0];
            if(dataWoSkins.split(":3:")[1].split(":46:")[0].startsWith("3:")) stars = dataWoSkins.split(":3:")[1].split("3:")[1].split(":46:")[0];
            if(dataWoSkins.split("3:")[2].split(":46:")[0].includes(":")) {
                stars = dataWoSkins.split("3:")[3].split(":46:")[0];
            } else {
                stars = stars;
            }

            if(dataWoSkins.split("3:")[3] !== undefined) {
                if(dataWoSkins.split("3:")[3].split(":46:")[0] == "") {
                    stars = dataWoSkins.split("3:")[4].split(":46:")[0];
                } else {
                    stars = stars;
                }
            } 

            let ytLnk = `htps://youtube.com/channel/${youtube}`;
            let twitterLnk = `https://twitter.com/${twitter}`;
            let twitchLnk = `https://twitch.tv/${twitch}`;
            
            if(youtube == "") ytLnk = null;
            if(twitter == "") twitterLnk = null;
            if(twitch == "") twitchLnk = null;
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

            const result = {
                username: username,
                playerID: Number(playerID),
                accountID: Number(accountID),
                rank: Number(rank),
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