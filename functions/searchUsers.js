module.exports = {
    searchUsers:
        async function(str) {
            if(!str || str == '') throw new Error("Please provide a query!");

            const axios = require("axios");
            const { headers, server, secret } = require("../config.json");
            const { decodeUserResult } = require("../misc/decodeUserResult.js");

            let res = await axios.post(server + "getGJUsers20.php", {
                str: str,
                secret: "Wmfd2893gb7"
            }, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data)
            });

            if(res.data == -1) throw new Error(`Couldn't find a "${str}" user.`)

            return decodeUserResult(res.data);
        }
}