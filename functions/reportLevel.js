module.exports = {
    reportLevel:
        async function(level) {
            if(!level) throw new Error("Please provide a level ID.");
            if(isNaN(Number(level))) throw new Error("The level ID should be a number.");

            const axios = require("axios")
            const {headers} = require("../config.json");

            const data = {
                levelID: Number(level),
                secret: "Wmfd2893gb7"
            }

            let res = await axios.post("http://www.boomlings.com/database/reportGJLevel.php", data, {
                headers: headers
            })

            if(res.data == -1) throw new Error("-1 Request denied.");

            return res.data;
        }
}