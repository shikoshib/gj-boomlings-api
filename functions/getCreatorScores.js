module.exports = {
    getCreatorScores:
        async function() {
            const { decodeUserResult } = require("../misc/decodeUserResult.js");
            const axios = require("axios");
            const { headers, server, secret } = require("../config.json");

            const data = {
                secret: secret,
                type: "creators",
                count: 100
            }

            let res = await axios.post(server + "getGJScores20.php", data, {
                headers: headers
            })

            let p1 = res.data.split("|")[0];
            let p2 = res.data.split("|")[1].split("|")[0];
            let p3 = res.data.split("|")[2].split("|")[0];
            let p4 = res.data.split("|")[3].split("|")[0];
            let p5 = res.data.split("|")[4].split("|")[0];
            let p6 = res.data.split("|")[5].split("|")[0];
            let p7 = res.data.split("|")[6].split("|")[0];
            let p8 = res.data.split("|")[7].split("|")[0];
            let p9 = res.data.split("|")[8].split("|")[0];
            let p10 = res.data.split("|")[9].split("|")[0];
            let p11 = res.data.split("|")[10].split("|")[0];
            let p12 = res.data.split("|")[11].split("|")[0];
            let p13 = res.data.split("|")[12].split("|")[0];
            let p14 = res.data.split("|")[13].split("|")[0];
            let p15 = res.data.split("|")[14].split("|")[0];
            let p16 = res.data.split("|")[15].split("|")[0];
            let p17 = res.data.split("|")[16].split("|")[0];
            let p18 = res.data.split("|")[17].split("|")[0];
            let p19 = res.data.split("|")[18].split("|")[0];
            let p20 = res.data.split("|")[19].split("|")[0];
            let p21 = res.data.split("|")[20].split("|")[0];
            let p22 = res.data.split("|")[21].split("|")[0];
            let p23 = res.data.split("|")[22].split("|")[0];
            let p24 = res.data.split("|")[23].split("|")[0];
            let p25 = res.data.split("|")[24].split("|")[0];
            let p26 = res.data.split("|")[25].split("|")[0];
            let p27 = res.data.split("|")[26].split("|")[0];
            let p28 = res.data.split("|")[27].split("|")[0];
            let p29 = res.data.split("|")[28].split("|")[0];
            let p30 = res.data.split("|")[29].split("|")[0];
            let p31 = res.data.split("|")[30].split("|")[0];
            let p32 = res.data.split("|")[31].split("|")[0];
            let p33 = res.data.split("|")[32].split("|")[0];
            let p34 = res.data.split("|")[33].split("|")[0];
            let p35 = res.data.split("|")[34].split("|")[0];
            let p36 = res.data.split("|")[35].split("|")[0];
            let p37 = res.data.split("|")[36].split("|")[0];
            let p38 = res.data.split("|")[37].split("|")[0];
            let p39 = res.data.split("|")[38].split("|")[0];
            let p40 = res.data.split("|")[39].split("|")[0];
            let p41 = res.data.split("|")[40].split("|")[0];
            let p42 = res.data.split("|")[41].split("|")[0];
            let p43 = res.data.split("|")[42].split("|")[0];
            let p44 = res.data.split("|")[43].split("|")[0];
            let p45 = res.data.split("|")[44].split("|")[0];
            let p46 = res.data.split("|")[45].split("|")[0];
            let p47 = res.data.split("|")[46].split("|")[0];
            let p48 = res.data.split("|")[47].split("|")[0];
            let p49 = res.data.split("|")[48].split("|")[0];
            let p50 = res.data.split("|")[49].split("|")[0];
            let p51 = res.data.split("|")[50].split("|")[0];
            let p52 = res.data.split("|")[51].split("|")[0];
            let p53 = res.data.split("|")[52].split("|")[0];
            let p54 = res.data.split("|")[53].split("|")[0];
            let p55 = res.data.split("|")[54].split("|")[0];
            let p56 = res.data.split("|")[55].split("|")[0];
            let p57 = res.data.split("|")[56].split("|")[0];
            let p58 = res.data.split("|")[57].split("|")[0];
            let p59 = res.data.split("|")[58].split("|")[0];
            let p60 = res.data.split("|")[59].split("|")[0];
            let p61 = res.data.split("|")[60].split("|")[0];
            let p62 = res.data.split("|")[61].split("|")[0];
            let p63 = res.data.split("|")[62].split("|")[0];
            let p64 = res.data.split("|")[63].split("|")[0];
            let p65 = res.data.split("|")[64].split("|")[0];
            let p66 = res.data.split("|")[65].split("|")[0];
            let p67 = res.data.split("|")[66].split("|")[0];
            let p68 = res.data.split("|")[67].split("|")[0];
            let p69 = res.data.split("|")[68].split("|")[0];
            let p70 = res.data.split("|")[69].split("|")[0];
            let p71 = res.data.split("|")[70].split("|")[0];
            let p72 = res.data.split("|")[71].split("|")[0];
            let p73 = res.data.split("|")[72].split("|")[0];
            let p74 = res.data.split("|")[73].split("|")[0];
            let p75 = res.data.split("|")[74].split("|")[0];
            let p76 = res.data.split("|")[75].split("|")[0];
            let p77 = res.data.split("|")[76].split("|")[0];
            let p78 = res.data.split("|")[77].split("|")[0];
            let p79 = res.data.split("|")[78].split("|")[0];
            let p80 = res.data.split("|")[79].split("|")[0];
            let p81 = res.data.split("|")[80].split("|")[0];
            let p82 = res.data.split("|")[81].split("|")[0];
            let p83 = res.data.split("|")[82].split("|")[0];
            let p84 = res.data.split("|")[83].split("|")[0];
            let p85 = res.data.split("|")[84].split("|")[0];
            let p86 = res.data.split("|")[85].split("|")[0];
            let p87 = res.data.split("|")[86].split("|")[0];
            let p88 = res.data.split("|")[87].split("|")[0];
            let p89 = res.data.split("|")[88].split("|")[0];
            let p90 = res.data.split("|")[89].split("|")[0];
            let p91 = res.data.split("|")[90].split("|")[0];
            let p92 = res.data.split("|")[91].split("|")[0];
            let p93 = res.data.split("|")[92].split("|")[0];
            let p94 = res.data.split("|")[93].split("|")[0];
            let p95 = res.data.split("|")[94].split("|")[0];
            let p96 = res.data.split("|")[95].split("|")[0];
            let p97 = res.data.split("|")[96].split("|")[0];
            let p98 = res.data.split("|")[97].split("|")[0];
            let p99 = res.data.split("|")[98].split("|")[0];
            let p100 = res.data.split("|")[99].split("|")[0];

            return [
                decodeUserResult(p1),
                decodeUserResult(p2),
                decodeUserResult(p3),
                decodeUserResult(p4),
                decodeUserResult(p5),
                decodeUserResult(p6),
                decodeUserResult(p7),
                decodeUserResult(p8),
                decodeUserResult(p9),
                decodeUserResult(p10),
                decodeUserResult(p11),
                decodeUserResult(p12),
                decodeUserResult(p13),
                decodeUserResult(p14),
                decodeUserResult(p15),
                decodeUserResult(p16),
                decodeUserResult(p17),
                decodeUserResult(p18),
                decodeUserResult(p19),
                decodeUserResult(p20),
                decodeUserResult(p21),
                decodeUserResult(p22),
                decodeUserResult(p23),
                decodeUserResult(p24),
                decodeUserResult(p25),
                decodeUserResult(p26),
                decodeUserResult(p27),
                decodeUserResult(p28),
                decodeUserResult(p29),
                decodeUserResult(p30),
                decodeUserResult(p31),
                decodeUserResult(p32),
                decodeUserResult(p33),
                decodeUserResult(p34),
                decodeUserResult(p35),
                decodeUserResult(p36),
                decodeUserResult(p37),
                decodeUserResult(p38),
                decodeUserResult(p39),
                decodeUserResult(p40),
                decodeUserResult(p41),
                decodeUserResult(p42),
                decodeUserResult(p43),
                decodeUserResult(p44),
                decodeUserResult(p45),
                decodeUserResult(p46),
                decodeUserResult(p47),
                decodeUserResult(p48),
                decodeUserResult(p49),
                decodeUserResult(p50),
                decodeUserResult(p51),
                decodeUserResult(p52),
                decodeUserResult(p53),
                decodeUserResult(p54),
                decodeUserResult(p55),
                decodeUserResult(p56),
                decodeUserResult(p57),
                decodeUserResult(p58),
                decodeUserResult(p59),
                decodeUserResult(p60),
                decodeUserResult(p61),
                decodeUserResult(p62),
                decodeUserResult(p63),
                decodeUserResult(p64),
                decodeUserResult(p65),
                decodeUserResult(p66),
                decodeUserResult(p67),
                decodeUserResult(p68),
                decodeUserResult(p69),
                decodeUserResult(p70),
                decodeUserResult(p71),
                decodeUserResult(p72),
                decodeUserResult(p73),
                decodeUserResult(p74),
                decodeUserResult(p75),
                decodeUserResult(p76),
                decodeUserResult(p77),
                decodeUserResult(p78),
                decodeUserResult(p79),
                decodeUserResult(p80),
                decodeUserResult(p81),
                decodeUserResult(p82),
                decodeUserResult(p83),
                decodeUserResult(p84),
                decodeUserResult(p85),
                decodeUserResult(p86),
                decodeUserResult(p87),
                decodeUserResult(p88),
                decodeUserResult(p89),
                decodeUserResult(p90),
                decodeUserResult(p91),
                decodeUserResult(p92),
                decodeUserResult(p93),
                decodeUserResult(p94),
                decodeUserResult(p95),
                decodeUserResult(p96),
                decodeUserResult(p97),
                decodeUserResult(p98),
                decodeUserResult(p99),
                decodeUserResult(p100)
            ];
        }
}