/**
 * @typedef {Object} AccountPost
 * @property {string} content - The account post's content.
 * @property {number} likes - The amount of likes the account post has.
 * @property {string} age - How long ago the account post was published.
 * @property {number} id - The account post's ID.
 */

module.exports = {
    /**
     * Get the list of a user's account posts.
     * @param {string} target - The targeted user's username or player ID.
     * @param {number} page - The page to look through. Defaults to 1.
     * @returns {AccountPost[]}
     */
    getAccountPosts: async function (target, page = 1) {
        if (!target) throw new Error("Please provide a player ID or username!");
        const { gjReq } = require("../gjReq");

        let search = await gjReq("getGJUsers20", {
            str: target,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) return [];
        let targetAccID = search.data.split(":")[21];

        let res = await gjReq("getGJAccountComments20", {
            accountID: targetAccID,
            secret: "Wmfd2893gb7",
            page: page - 1
        })
        if (res.data == -1) throw new Error("-1 Not found.");
        if (res.data.startsWith("#")) return [];

        let accPosts = res.data.split("#")[0].split("|");
        let result = [];
        accPosts.forEach(p => {
            result.push({
                content: Buffer.from(p.split("~")[1], "base64").toString(),
                likes: Number(p.split("~")[3]),
                age: p.split("~")[5],
                id: Number(p.split("~")[7])
            });
        })

        return result;
    }
}