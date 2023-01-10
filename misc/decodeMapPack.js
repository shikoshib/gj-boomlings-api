module.exports = {
    decodeMapPack:
        function(mp) {

            let spl = mp.split(':');
            let mpInfo = [];
            for(let i =0;i<spl.length;i++) {
                if(i%2!=0) {
                    mpInfo.push(spl[i-1]+`:`+spl[i]);
                }
            }

            let mappackID = mpInfo[0].split("1:")[1];
            let name = mpInfo[1].split("2:")[1];
            let unarrayedList = mpInfo[2].split("3:")[1];
            let stars = mpInfo[3].split("4:")[1];
            let coins = mpInfo[4].split("5:")[1];
            let difficulty = mpInfo[5].split("6:")[1];
            let txtCol = mpInfo[6].split("7:")[1];
            let barCol = mpInfo[7].split("8:")[1];
            
            let firstLvl = unarrayedList.split(",")[0];
            let secondLvl = unarrayedList.split(",")[1].split(",")[0];
            let thirdLvl = unarrayedList.split(",")[2].split(",")[0];

            let difficultyDecoder = {
                "0": "Auto",
                "1": "Easy",
                "2": "Normal",
                "3": "Hard",
                "4": "Harder",
                "5": "Insane",
                "6": "Hard Demon",
                "7": "Easy Demon",
                "8": "Medium Demon",
                "9": "Insane Demon",
                "10": "Extreme Demon",
            }

            const { rgbToHEX } = require("./rgbToHEX.js");

            const result = {
                name: name,
                id: Number(mappackID),
                levels: [Number(firstLvl),Number(secondLvl),Number(thirdLvl)],
                stars: Number(stars),
                coins: Number(coins),
                difficulty: difficultyDecoder[difficulty],
                textColor: rgbToHEX(txtCol),
                barColor: rgbToHEX(barCol)
            }

            return result;
        }
}