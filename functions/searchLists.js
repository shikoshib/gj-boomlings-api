/**
 * @typedef {Object} List
 * @property {number} id - The list ID.
 * @property {string} name - The list name.
 * @property {string} description - The list's description.
 * @property {string} difficulty - The list's difficulty.
 * @property {string} username - The list uploader's username.
 * @property {number} playerID - The list uploader's player ID.
 * @property {number} accountID - The list uploader's account ID.
 * @property {string} downloads - The amount of times the list has been downloaded.
 * @property {number} likes - The amount of likes the list has.
 * @property {number} diamonds - The amount of diamonds given when completing the list.
 * @property {boolean} disliked - Whether the list is disliked (i.e. if the likes count is less than 0).
 * @property {Array<Number>} levels - The array of level IDs in the list.
 * @property {number} required - The amount of completed levels required to get the reward.
 * @property {number} uploadedUnix - The UNIX timestamp of the list's upload date.
 */

module.exports = {
    /**
     * Searches for lists.
     * @param {string} query - The search query.
     * @param {number} page - The page to search through. Defaults to 1.
     * @returns {List[]}
     */
    searchLists: async function (query, page = 1) {
        const { gjReq } = require("../gjReq");
        const GJDecode = require("../misc/GJDecode");
        const { decodeLists } = new GJDecode;
        const res = await gjReq("getGJLevelLists", {
            type: 0,
            str: query,
            secret: "Wmfd2893gb7",
            page: Number(page) - 1
        })
        if (res.data == -1) return [];
        return decodeLists(res.data);
    }
}