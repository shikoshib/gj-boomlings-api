/**
 * @typedef {Object} MapPack
 * @property {string} name - The map pack's name.
 * @property {number} id - The map pack's ID.
 * @property {Array<Number>} levels - The list of level IDs in the map pack.
 * @property {Number} stars - The amount of stars received from completing the map pack.
 * @property {number} coins - The amount of secret coins received from completing the map pack.
 * @property {string} difficulty - The map pack's difficulty.
 * @property {string} textColor - The map pack's title color.
 * @property {string} barColor - The map pack's progress bar color.
 */
module.exports = {
    /**
     * Gets the map packs from a specified page.
     * @param {number} page - The page to search through. Defaults to 1.
     * @returns {MapPack[]}
     */
    getMapPacks: async function (page = 1) {
        const { gjReq } = require("../gjReq");
        const data = {
            secret: "Wmfd2893gb7",
            page: Number(page) - 1
        }

        let res = await gjReq("getGJMapPacks21", data);
        if (res.data.startsWith("#")) throw new Error("-1 Not found.");

        let packs = res.data.split("#")[0].split("|");
        let result = [];
        packs.forEach(p => {
            const { rgbToHEX } = require("../misc/rgbToHEX");
            let diffObj = {
                0: "Auto",
                1: "Easy",
                2: "Normal",
                3: "Hard",
                4: "Harder",
                5: "Insane",
                6: "Hard Demon",
                7: "Easy Demon",
                8: "Medium Demon",
                9: "Insane Demon",
                10: "Extreme Demon"
            }
            let lvls = [];
            for (let lvl of p.split(":")[5].split(",")) {
                lvls.push(Number(lvl));
            }
            result.push({
                name: p.split(":")[3],
                id: Number(p.split(":")[1]),
                levels: lvls,
                stars: Number(p.split(":")[7]),
                coins: Number(p.split(":")[9]),
                difficulty: diffObj[p.split(":")[11]],
                textColor: rgbToHEX(p.split(":")[13]),
                barColor: rgbToHEX(p.split(":")[15])
            })
        })

        return result;
    }
}