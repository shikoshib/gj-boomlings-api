module.exports = {
    blockUser:
        async function(target, username, password) {
            if(!target || target == "") throw new Error("Please provide a player ID or username!");
            if(!username || username == "") throw new Error("Please provide your player ID or username!");
            if(!password || password == "") throw new Error("Please provide your password!");
            const axios = require("axios");
            const {headers, server} = require("../config.json");
            
            let resp = await axios.post(server + "getGJUsers20.php", {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: username,
                secret: "Wmfd2893gb7"
            }, {
                headers: headers
            }).catch(e => {
                if(e.response.data == -1) throw new Error(`Couldn't find a "${username}" user.`)
                throw new Error(e.response.data)
            })

            let accID = resp.data.split(":16:")[1].split(":3:")[0];

            const userData = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: target,
                secret: "Wmfd2893gb7"
            }

            let r = await axios.post(server + "getGJUsers20.php", userData, {
                headers: headers
            }).catch(e => {
                if(e.response.data == -1) throw new Error(`Couldn't find a "${username}" user.`)
                throw new Error(e.response.data)
            })
            let targetId = r.data.split(":16:")[1].split(":3:")[0];

            const {gjp} = require("../misc/gjp.js");
            
            const blockData = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                secret: "Wmfd2893gb7",
                targetAccountID: targetId,
                accountID: accID,
                gjp: gjp(password)
            }

            let res = await axios.post(server + "blockGJUser20.php", blockData, {
                headers: headers
            }).catch(e => {
                if(res.data.toString().toLowerCase() == "error code: 1020") throw new Error("1020 error: Request denied.");
                throw new Error(e)
            })

            return 1;
        }
}