module.exports = {
    rgbToHEX: function (col) {
        if (!col) col = "255,255,255";

        let r = col.split(",")[0];
        let g = col.split(",")[1];
        let b = col.split(",")[2];

        if (b.includes("#")) b = b.split("#")[0];

        let rHex = Number(r).toString(16);
        let gHex = Number(g).toString(16);
        let bHex = Number(b).toString(16);

        return `#${rHex.length == 1 ? "0" + rHex : rHex}${gHex.length == 1 ? "0" + gHex : gHex}${bHex.length == 1 ? "0" + bHex : bHex}`.toUpperCase()
    }
};