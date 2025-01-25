/**
 * @typedef {Object} Player
 * @property {string} username - The player's username.
 * @property {number} playerID - The player's player ID.
 * @property {number} accountID - The player's account ID.
 * @property {number} rank - The player's position on the global leaderboard.
 * @property {number} stars - The amount of stars the player has.
 * @property {number} diamonds - The amount of diamonds the player has.
 * @property {number} secretCoins - The amount of secret coins the player has.
 * @property {number} userCoins - The amount of user coins the player has.
 * @property {number} demons - The amount of demons the player has completed.
 * @property {number} moons - The amount of moons the player has.
 * @property {number} creatorPoints - The amount of creator points the player has.
 * @property {string} color1 - The HEX code of the player's primary color.
 * @property {string} color2 - The HEX code of the player's secondary color.
 * @property {number} cubeID - The ID of the currently selected cube icon.
 * @property {number} shipID - The ID of the currently selected ship icon.
 * @property {number} ballID - The ID of the currently selected ball icon.
 * @property {number} ufoID - The ID of the currently selected UFO icon.
 * @property {number} waveID - The ID of the currently selected wave icon.
 * @property {number} robotID - The ID of the currently selected robot icon.
 * @property {number} spiderID - The ID of the currently selected spider icon.
 * @property {number} swingID - The ID of the currently selected swing icon.
 * @property {number} jetpackID - The ID of the currently selected jetpack icon.
 * @property {number} explosionID - The ID of the currently selected explosion animation.
 * @property {boolean} glow - Whether the player's icon has the "glow" feature enabled.
 * @property {string} messages - The current state of messaging the player. Returns "all" if anyone can message the person, "friends" if it's limited to friends, and "none" if no one can.
 * @property {boolean} friendRequests - Whether the player has allowed to receive friend requests.
 * @property {string} commentHistory - The current state of viewing the player's comment history. Returns "all" if anyone can do it, "friends" if it's limited to friends, and "none" if only the player can.
 * @property {string|null} mod - Whether the player is a moderator. Returns `null` if not, "mod" if the user is a regular moderator and "elder" if the user is an elder moderator.
 * @property {string} youtube - The player's YouTube channel ID, used in this template: `https://youtube.com/channel/((youtube))`.
 * @property {string} twitter - The player's X (formerly Twitter) username, used in this template: `https://x.com/((twitter))`.
 * @property {string} twitch - The player's Twitch username, used in this template: `https://twitch.tv/((twitch))`.
 */

module.exports = {
    /**
     * Fetches the profile of a specified user.
     * @param {string} name - The search query (user, account ID or player ID).
     * @param {("name"|"accountid"|"playerid")} mode - The search mode, defaults to "auto". If "auto" is selected, the search is first attempted by matching the matching the username, then account ID and then player ID.
     * @returns {Player}
     */
    getProfile: async function (name, mode = "auto") {
        const { gjReq } = require("../gjReq");
        const { rgbToHEX } = require("../misc/rgbToHEX");
        const colors = require("../misc/colors.json");
        if (!name) throw new Error("Please provide an account name, player ID or account ID!")
        if (!["name", "accountid", "playerid", "auto"].includes(mode)) throw new Error("Please provide a valid search mode! It's either \"name\", \"accountid\", \"playerid\", or \"auto\"")

        function decodeUser(array) {
            let accName = array[1];
            let playerID = Number(array[3]);
            let secretCoins = Number(array[5]);
            let userCoins = Number(array[7]);
            let c1 = array[9];
            let c2 = array[11];
            let stars = Number(array[15]);
            let moons = Number(array[17]);
            let diamonds = Number(array[19]);
            let demons = Number(array[21]);
            let cp = Number(array[23]);
            let msg = array[25];
            let friendReqs = array[27];
            let commentHistory = array[29];
            let yt = array[31];
            let cube = Number(array[33]);
            let ship = Number(array[35]);
            let ball = Number(array[37]);
            let ufo = Number(array[39]);
            let wave = Number(array[41]);
            let robot = Number(array[43]);
            let spider = Number(array[47]);
            let swing = Number(array[51]);
            let jetpack = Number(array[53]);
            let glow = Boolean(Number(array[45]));
            let explosion = Number(array[49]);
            let rank = Number(array[55]);
            let accID = Number(array[57]);
            let twitter = array[61];
            let twitch = array[63];
            let mod = array[65];

            let msgObj = {
                0: "all",
                1: "friends",
                2: "none"
            }

            let friendReqsObj = {
                0: true,
                1: false
            }

            let modObj = {
                0: null,
                1: "mod",
                2: "elder"
            }

            return {
                username: accName,
                playerID: playerID,
                accountID: accID,
                rank: rank,
                stars: stars,
                diamonds: diamonds,
                secretCoins: secretCoins,
                userCoins: userCoins,
                demons: demons,
                moons: moons,
                creatorPoints: cp,
                color1: rgbToHEX(colors[c1]),
                color2: rgbToHEX(colors[c2]),
                cubeID: cube,
                shipID: ship,
                ballID: ball,
                ufoID: ufo,
                waveID: wave,
                robotID: robot,
                spiderID: spider,
                swingID: swing,
                jetpackID: jetpack,
                explosionID: explosion,
                glow: glow,
                messages: msgObj[msg],
                friendRequests: friendReqsObj[friendReqs],
                commentHistory: msgObj[commentHistory],
                mod: modObj[mod],
                youtube: yt,
                twitter: twitter,
                twitch: twitch
            }
        }

        async function accIDSearch() {
            let res = await gjReq("getGJUserInfo20", {
                targetAccountID: name,
                secret: "Wmfd2893gb7"
            });
            if (res.data == -1) return {};
            let accArray = res.data.split(":");

            return decodeUser(accArray);
        }

        async function nonAccIDSearch() {
            let search = await gjReq("getGJUsers20", {
                str: name,
                secret: "Wmfd2893gb7"
            });
            if (search.data == -1) return {};
            let targetAccID = search.data.split(":")[21];

            let res = await gjReq("getGJUserInfo20", {
                targetAccountID: targetAccID,
                secret: "Wmfd2893gb7"
            });
            let accArray = res.data.split(":");

            return decodeUser(accArray);
        }

        if (mode == "accountid") {
            const user = await new Promise((resolve) => {
                accIDSearch().then(u => resolve(u));
            })
            return user;
        }

        if (mode == "name" || mode == "playerid") {
            const user = await new Promise((resolve) => {
                nonAccIDSearch().then(u => resolve(u));
            })
            return user;
        }

        if (isNaN(name)) {
            const user = await new Promise((resolve) => {
                nonAccIDSearch().then(u => resolve(u));
            })
            return user;
        } else {
            let user;
            const accIDUser = await new Promise((resolve) => {
                accIDSearch().then(u => resolve(u));
            })
            if (!Object.keys(user).length) {
                const nonAccIDUser = await new Promise((resolve) => {
                    nonAccIDSearch().then(u => resolve(u));
                })
                user = nonAccIDUser;
            } else {
                user = accIDUser;
            }
            return user;
        }
    }
}