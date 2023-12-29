module.exports = {
    getAccountPosts: async function (str, page = 1) {
        if (!str) throw new Error("Please provide a player ID or name!");
        const { gjReq } = require("../gjReq");

        let search = await gjReq("getGJUsers20", {
            str: str,
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
            result.push({ content: Buffer.from(p.split("~")[1], "base64").toString(), likes: Number(p.split("~")[3]), age: p.split("~")[5], id: Number(p.split("~")[7]) });
        })

        return result;
    }
}