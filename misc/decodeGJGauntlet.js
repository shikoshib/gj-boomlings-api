module.exports = {
    decodeGJGauntlet:
        function(gauntlet) {
            let gauntletID = gauntlet.split(":3:")[0].split("1:")[1]
            if(gauntletID == "") gauntletID = "1";
            let levelList = gauntlet.split(":3:")[1];
            if(levelList.includes("#")) levelList = gauntlet.split(":3:")[1].split("#")[0];

            if(levelList.includes(":")) levelList = gauntlet.split("3:")[2];

            let firstLvl = levelList.split(",")[0];
            let secondLvl = levelList.split(",")[1].split(",")[0];
            let thirdLvl = levelList.split(",")[2].split(",")[0];
            let fourthLvl = levelList.split(",")[3].split(",")[0];
            let fifthLvl = levelList.split(",")[4].split(",")[0];

            const gauntletIDs = {
                "1": "Fire Gauntlet",
                "2": "Ice Gauntlet",
                "3": "Poison Gauntlet",
                "4": "Shadow Gauntlet",
                "5": "Lava Gauntlet",
                "6": "Bonus Gauntlet",
                "7": "Chaos Gauntlet",
                "8": "Demon Gauntlet",
                "9": "Time Gauntlet",
                "10": "Crystal Gauntlet",
                "11": "Magic Gauntlet",
                "12": "spike Gauntlet",
                "13": "Monster Gauntlet",
                "14": "Doom Gauntlet",
                "15": "Death Gauntlet",
                undefined: "Poison Gauntlet"
            }

            const list = [firstLvl,secondLvl,thirdLvl,fourthLvl,fifthLvl]

            const result = {
                "name": gauntletIDs[gauntletID],
                "levels": list
            }

            return result;
        }
}