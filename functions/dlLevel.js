module.exports = {
    dlLevel:
        async function(level) {
            const bs = require("js-base64")
            if(!level || level == "") throw new Error("Please provide a level ID.");
            if(isNaN(level)) throw new Error("The level parameter should be a number.");
            const axios = require("axios");
            const { headers, server } = require("../config.json");

            const XOR = require("../misc/xor.js");
            let xor = new XOR()

            const data = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                levelID: level.toString().trim(),
                secret: "Wmfd2893gb7"
            }

            let res = await axios.post(server + 'downloadGJLevel22.php', data, {
                headers: headers
            })

            if(res.data == -1) throw new Error("-1 Not found.")
            if(res.data.toLowerCase() == "error code: 1005") throw new Error("1005 error: Your IP address has been blocked from sending requests to a server. It's recommended to use locally (directly from a PC).")
            let split1 = res.data.split("1:")[1];      // id
            let split2 = res.data.split(":2:")[1];     // name
            let split3 = res.data.split(":3:")[1];     // description
            let split4 = res.data.split(":5:")[1];     // level version
            let split5 = res.data.split(":9:")[1];     // difficulty
            let split6 = res.data.split(":18:")[1];    // stars
            let split7 = res.data.split("0:10:")[1];   // downloads
            let split8 = res.data.split(":14:")[1];    // likes
            let split9 = res.data.split(":15:")[1];    // length
            let split10 = res.data.split(":27:")[1];   // password
            let split11 = res.data.split(":17:")[1];   // demon or not
            let split12 = res.data.split(":19:")[1];   // featured
            let split13 = res.data.split(":42:")[1];   // epic
            let split14 = res.data.split(":45:")[1];   // objects
            let split15 = res.data.split(":28:")[1];   // uploaded
            let split16 = res.data.split(":29:")[1];   // updated
            let split17 = res.data.split(":39:")[1];   // stars requested
            let split18 = res.data.split(":40:")[1];   // ldm
            let split19 = res.data.split(":30:")[1];   // copied from
            let split20 = res.data.split(":31:")[1];   // two player
            let split21 = res.data.split(":37:")[1];   // coins
            let split22 = res.data.split(":38:")[1];   // verified coins
            let split23 = res.data.split(":6:")[1];    // player id
            let split24 = res.data.split(":13:")[1];   // game version
            let split25 = res.data.split(":12:")[1];   // official song id
            let split26 = res.data.split(":35:")[1];   // custom song id

            if(split25.split(":13:")[0].includes(":")) split25 = res.data.split(":12:")[2];
            if(split26.split(":36:")[0].includes(":")) split26 = res.data.split(":35:")[2];

            let difficultyDecoding = {
                "0": "Unrated",
                "10": "Easy",
                "20": "Normal",
                "30": "Hard",
                "40": "Harder",
                "50": "Insane"
            }

            if(split11.split(":43:")[0] == "1") {
                difficultyDecoding = {
                    "10": "Easy Demon",
                    "20": "Medium Demon",
                    "30": "Hard Demon",
                    "40": "Insane Demon",
                    "50": "Extreme Demon"
                }
            }

            const binaryBool = {
                undefined: false,
                "0": false,
                "1": true
            };

            const featuredDecoding = {
                undefined: true,
                "0": false,
                "1": true
            }

            let featured = featuredDecoding[split12.split(":42:")[0]];
            if(featured == undefined) featured = true;

            let demonBool = binaryBool[split11.split(":43:")[0]];
            if(split11.split(":43:")[0] == "") demonBool = false;

            let ldm = binaryBool[split18.split(":27")[0]]
            if(ldm == undefined) ldm = false;

            const lengthDecoding = {
                "0": "Tiny",
                "1": "Short",
                "2": "Medium",
                "3": "Long",
                "4": "XL"
            }
            if(lengthDecoding[split9.split(":30:")[0]] == undefined) split9 = res.data.split(":15:")[2];
            
            let desc = bs.decode(split3.split(":4:")[0].replace(/_/g, '/').replace(/-/g, '+'));
            if(desc == "") desc = "(No description provided)"

            let likes = split8.split(":17:")[0];
            let dislikedBool;
            if(likes.includes("-")) {
                dislikedBool = true;
            } else {
                dislikedBool = false;
            }

            const decryptedPass = xor.decrypt(split10, 26364);
            if (decryptedPass.length > 1) split10 = decryptedPass.slice(1);
            else split10 = decryptedPass;
            if (decryptedPass.length > 7) split10 = "Non-copyable";

            const authData = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: split23.split(":8:")[0],
                secret: "Wmfd2893gb7"
            }
            let auth = await axios.post(server + "getGJUsers20.php", authData, {
                headers: headers
            })
            let authname;
            if(auth.data == "-1") {
                authname = "-"
            } else if(!auth.data.startsWith("-")) {
                authname = auth.data.split("1:")[1].split(":2:")[0];
            }

            const { getSongInfo } = require("./getSongInfo.js");
            const { getOfficialSongInfo } = require("./getOfficialSongInfo.js");
            let song;

            let copiedId = split19.split(":31:")[0];
            if(copiedId.includes(":")) split19 = res.data.split(":30:")[2];

            let starsCount = split6.split(":19:")[0];
            if(starsCount.includes(":")) split6 = res.data.split(":18:")[2];

            const decodeGameVersion = {
                "1": "1.0",
                "2": "1.1",
                "3": "1.2",
                "4": "1.3",
                "5": "1.4",
                "6": "1.5",
                "7": "1.6",
                "10": "1.7",
                "18": "1.8",
                "19": "1.9",
                "20": "2.0",
                "21": "2.1"
            }

            let objs = split14.split(":15:")[0];
            if(Number(objs) == NaN) objs = split14.split(":15:")[1];

            let offSongID = Number(split25.split(":13:")[0]) + 1;
            if(split25.split(":13:")[0] == "0" && split26.split(":36:")[0] != "0") {
                try {
                    song = await getSongInfo(split26.split(":36:")[0]);
                } catch(err) {
                    let songReq = await axios.post(server + 'getGJLevels21.php', {
                        gameVersion: 21,
                        binaryVersion: 35,
                        gdw: 0,
                        type: 0,
                        str: level,
                        secret: "Wmfd2893gb7"
                    }, {
                        headers: headers
                    })
                    if(!songReq.data.includes("~|~")) {
                         song = {
                            "name": "Unknown",
                            "id": Number(split26.split(":36:")[0]),
                            "artist": "Unknown",
                            "artistId": null,
                            "fileSize": "0MB",
                            "link": null
                         }
                    } else {
                        song = {
                        "name": songReq.data.split("|~2~|~")[1].split("~|~3~|~")[0],
                        "id": Number(songReq.data.split("1~|~")[1].split("~|~2~|")[0]),
                        "artist": songReq.data.split("~|~4~|~")[1].split("~|~5~|~")[0],
                        "artistId": Number(songReq.data.split("~|~3~|~")[1].split("~|~4~|~")[0]),
                        "fileSize": `${songReq.data.split("~|~5~|~")[1].split("~|~6~|~")[0]} MB`,
                        "link": decodeURIComponent(songReq.data.split("~|~10~|~")[1].split("~|~7~|~")[0])
                        }
                    }
                }
            } else if(split25.split(":13:")[0] != "0" && split26.split(":36:")[0] == "0") {
                song = getOfficialSongInfo(offSongID);
            } else if(split25.split(":13:")[0] == "0" && split26.split(":36:")[0] == "0") {
                song = getOfficialSongInfo(1);
            }
                
                const result = {
                    "id": Number(split1.split(":2:")[0]),
                    "name": split2.split(":3:")[0].toString(),
                    "description": desc.trim(),
                    "creator": authname,
                    "level_version": Number(split4.split(":6:")[0]),
                    "difficulty": difficultyDecoding[split5.split(":10:")[0]].toString(),
                    "stars": Number(split6.split(":19:")[0]),
                    "downloads": Number(split7.split(":12:")[0]),
                    "likes": Number(likes),
                    "disliked": dislikedBool,
                    "length": lengthDecoding[split9.split(":30:")[0]],
                    "password": split10,
                    "demon": demonBool,
                    "featured": featured,
                    "epic": featuredDecoding[split13.split(":45:")[0]],
                    "objects": Number(objs),
                    "uploaded": split15.split(":29:")[0],
                    "updated": split16.split(":35:")[0],
                    "stars_requested": Number(split17.split(":46:")[0]),
                    "game_version": decodeGameVersion[split24.split(":14:")[0]],
                    "ldm": ldm,
                    "copied": Number(split19.split(":31:")[0]),
                    "two_p": binaryBool[split20.split(":28:")[0]],
                    "coins": Number(split21.split(":38:")[0]),
                    "verified_coins": binaryBool[split22.split(":39:")[0]],
                    "song": song
                }

            return result;
        }
}