module.exports = {
    reportLevel:
        async function(level) {
            if(!level || level == "") throw new Error("Please provide a level ID.");
            if(isNaN(Number(level))) throw new Error("The level ID should be a number.");

            const axios = require("axios")
            const {headers, server} = require("../config.json");

            const data = {
                levelID: level.toString().trim(),
                secret: "Wmfd2893gb7"
            }

            let res = await axios.post(server + "reportGJLevel.php", data, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data)
            })
            return res.data;
        }
}