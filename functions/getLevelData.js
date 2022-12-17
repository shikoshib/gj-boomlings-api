module.exports = {
    getLevelData:
        function(level, log = false) {
            if(typeof level === "string") throw new Error("The level parameter should be a number.");
            const axios = require("axios");
            const { headers } = require("../config.json");

            const data = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                levelID: level,
                secret: "Wmfd2893gb7"
            }

            axios.post('http://www.boomlings.com/database/downloadGJLevel22.php', data, {
                headers: headers
            
            }).then(res => {

                if(res.data == -1) throw new Error("-1 Not found.")
                if(res.data == "Error code: 1005") throw new Error("1005 error: Your IP address has been blocked from sending requests to a server. It's recommended to use locally (directly from a PC).")
    
                let levelData = res.data.split(":4:")[1].split(":5:")[0]
                if(log == true) console.log(levelData);
                return levelData;
            });
        }
}