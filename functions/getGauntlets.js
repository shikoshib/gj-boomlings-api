/**
 * @typedef {Object} Gauntlet
 * @property {string} name - The gauntlet's name.
 * @property {number} id - The gauntlet's ID.
 * @property {Array<Number>} levels - The list of level IDs in the gauntlet.
 */
module.exports = {
    /**
     * Gets the list of gauntlets.
     * @returns {Gauntlet[]}
     */
    getGauntlets: async function () {
        const glIDs = require("../misc/gauntlets.json");
        const { gjReq } = require("../gjReq");

        let res = await gjReq("getGJGauntlets21", { secret: "Wmfd2893gb7", special: 1 })

        let gauntlets = res.data.split("#")[0].split("|");
        let result = [];
        gauntlets.forEach(g => {
            let arr = g.split(":")[3].split(",");
            let list = [];
            for (let level of arr) {
                list.push(Number(level));
            }
            result.push({
                name: `${glIDs[g.split(":")[1]]} Gauntlet`,
                id: Number(g.split(":")[1]),
                levels: list
            });
        })

        return result;
    }
}