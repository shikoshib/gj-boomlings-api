/**
 * @typedef {Object} Song
 * @property {string} name - The song's name.
 * @property {number} id - The song's ID.
 * @property {string} artist - The song artist.
 * @property {number} artistId - The song artist's ID on Newgrounds.
 * @property {number} fileSize - The song's file size in megabytes.
 * @property {string} link - The direct link to download the song file.
 */

/**
 * @typedef {Object} Level
 * @property {number} id - The level's ID.
 * @property {string} name - The level's name.
 * @property {string} description - The level's description.
 * @property {string} levelVersion - The level's current version number.
 * @property {number} playerID - The level uploader's player ID.
 * @property {string} difficulty - The level's difficulty.
 * @property {number} stars - The amount of given stars when completing the level.
 * @property {number} downloads - The amount of times the level has been downloaded.
 * @property {number} likes - The amount of likes the level has.
 * @property {boolean} disliked - Whether the level is disliked (i.e. if the likes count is less than 0).
 * @property {string} length - The level's length.
 * @property {boolean} demon - Whether the level is a demon.
 * @property {boolean} featured - Whether the level is featured.
 * @property {boolean} epic - Whether the level is epic-rated.
 * @property {string|boolean} rating - Primarily used for new 2.2 ratings. Returns either "epic", "legendary", "mythic", or `false` if the level's rating is lower than epic.
 * @property {number} objects - The amount of objects the level has (inaccurate because it could be circumvented, and caps at 65,535).
 * @property {number} starsRequested - The amount of stars the uploader requested for this level.
 * @property {string} gameVersion - The version of the game used to upload the current version of the level. Returns "Pre-1.7" if the level was last updated in 1.6 or earlier.
 * @property {number} copiedID - The original level's ID if this level was copied. Returns 0 if the level is original on itself.
 * @property {boolean} large - Whether the level is considered "large" (i.e. has more than 40k objects).
 * @property {boolean} twoPlayer - Whether the level can be played by two people.
 * @property {number} coins - The amount of coins the level has.
 * @property {boolean} verifiedCoins - Whether the coins are verified.
 * @property {string} creator - The level uploader's username.
 * @property {Song} song - The main song used in the level.
 */
module.exports = {
    /**
     * Gets a level by its ID. Works considerably faster than dlLevel(), yet lacks the last update/upload date, password, LDM, accurate object count, SFX and additional songs (if any).
     * @param {number} id - The level's ID.
     * @returns {Level}
     */
    getLevelByID: async function (id) {
        if (isNaN(id)) throw new Error("Please provide a valid level ID!");
        const { gjReq } = require("../gjReq");
        const GJDecode = require("../misc/GJDecode");
        const { decodeSearchResults } = new GJDecode;
        const res = await gjReq("getGJLevels21", {
            secret: "Wmfd2893gb7",
            str: id,
            type: 0
        });
        if (res.data == -1) return {};
        return decodeSearchResults(res.data)[0];
    }
}