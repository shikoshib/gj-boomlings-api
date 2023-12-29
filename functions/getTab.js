module.exports = {
    getTab: async function (tab, page = 1) {
        let tabs = { trending: 3, recent: 4, featured: 6, magic: 7, awarded: 11, sent: 27 }
        if (!tabs[tab.toLowerCase()]) throw new Error('Please provide a valid tab! Possible tabs: "trending", "recent", "featured", "magic", "awarded", "sent".');
        const { gjReq } = require("../gjReq");
        let GJDecode = require("../misc/GJDecode");
        const { decodeSearchResults } = new GJDecode;
        const res = await gjReq("getGJLevels21", {
            type: tabs[tab.toLowerCase()],
            page: Number(page) - 1,
            secret: "Wmfd2893gb7"
        });
        if (res.data == -1) return [];
        return decodeSearchResults(res.data);
    }
}