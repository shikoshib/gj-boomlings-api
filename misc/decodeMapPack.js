module.exports = {
    decodeMapPack:
        function(mp) {
            let name = mp.split(":2:")[1].split(":3:")[0];
            let unarrayedList = mp.split(":3:")[1].split(":4:")[0].split(":4")[0];
            let stars = mp.split(":4:")[1].split(":5:")[0];
            let coins = mp.split(":5:")[1].split(":6:")[0];
            let difficulty = mp.split(":6:")[1].split(":7:")[0];

            if(unarrayedList.includes(":")) unarrayedList = mp.split(":3:")[2].split(":4:")[0]

            let firstLvl = unarrayedList.split(",")[0];
            let secondLvl = unarrayedList.split(",")[1].split(",")[0];
            let thirdLvl = unarrayedList.split(",")[2].split(",")[0];

            if(name.includes(":")) name = name.split("2:")[1]

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

            if(coins.startsWith("5:")) {
                coins = coins.split("5:")[1];
            }

            if(mp.split(":5:")[2] !== undefined) {
                if(coins.includes(":")) {
                    coins = mp.split(":5:")[2].split(":6:")[0];
                }
            }

            if(coins.startsWith("5:")) coins = coins.split("5:")[1];
            if(coins.startsWith("7:")) coins = mp.split(":5:")[1].split(":6:")[0];
            if(coins.endsWith(":6")) coins = coins.split(":6")[0];

            const result = {
                name: name,
                levels: [Number(firstLvl),Number(secondLvl),Number(thirdLvl)],
                stars: Number(stars),
                coins: Number(coins)
            }

            return result;
        }
}