module.exports = {
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