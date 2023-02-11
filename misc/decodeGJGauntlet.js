module.exports = {
    decodeGJGauntlet:
        function(gauntlet) {
            let spl = gauntlet.split(':');
            
            let id = spl[1];
            let lvlList = spl[3];

            let arr = lvlList.split(",");
            let Lvl1 = arr[0];
            let Lvl2 = arr[1]
            let Lvl3 = arr[2];
            let Lvl4 = arr[3];
            let Lvl5 = arr[4].split("#")[0];

            const glIDs = {
                "1": "Fire",
                "2": "Ice",
                "3": "Poison",
                "4": "Shadow",
                "5": "Lava",
                "6": "Bonus",
                "7": "Chaos",
                "8": "Demon",
                "9": "Time",
                "10": "Crystal",
                "11": "Magic",
                "12": "spike",
                "13": "Monster",
                "14": "Doom",
                "15": "Death"
            }

            let list = [Number(Lvl1),Number(Lvl2),Number(Lvl3),Number(Lvl4),Number(Lvl5)]

            const result = {
                "name": `${glIDs[id]} Gauntlet`,
                "levels": list
            }

            return result;
        }
}