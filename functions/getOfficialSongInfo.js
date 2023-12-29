module.exports = {
    getOfficialSongInfo: function (song) {
        if (isNaN(song)) throw new Error("Please provide a valid official song ID.");
        const { sm, bot, pg, dout, bab, clg, j, tm, c, xs, cf, toe, ea, cs, ed, hf, bp, toeii, gd, d, fd, dash, exp, tss, va, ar, tc, p, bm, m, y, f, sp, s, e, round, mdo, ps, ne, pt, unknown } = require("../misc/officialsongs.json");
        const jsons = { 1: sm, 2: bot, 3: pg, 4: dout, 5: bab, 6: clg, 7: j, 8: tm, 9: c, 10: xs, 11: cf, 12: toe, 13: ea, 14: cs, 15: ed, 16: hf, 17: bp, 18: toeii, 19: gd, 20: d, 21: fd, 22: dash, 23: exp, 24: tss, 25: va, 26: ar, 27: tc, 28: p, 29: bm, 30: m, 31: y, 32: f, 33: sp, 34: s, 35: e, 36: round, 37: mdo, 38: ps, 39: ne, 40: pt };

        let result = jsons[Number(song)];
        if (!result) result = unknown;
        return result;
    }
}