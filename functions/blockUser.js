module.exports = {
    blockUser:
        async function(target, username, password) {
            if(!target || target == "") throw new Error("Please provide a player ID or username!");
            if(!username || username == "") throw new Error("Please provide your player ID or username!");
            if(!password || password == "") throw new Error("Please provide your password!");
            const axios = require("axios");
            const {headers, server} = require("../config.json");

            const userData = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: target,
                secret: "Wmfd2893gb7"
            }
            
            let resp = await axios.post(server + "getGJUsers20.php", {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: username,
                secret: "Wmfd2893gb7"
            }, {
                headers: headers
            })
            if(resp.data == -1) throw new Error(`Couldn't find a "${username}" user.`)
            if(resp.data.toLowerCase() == "error code: 1020") throw new Error("1020 error: Request denied.");
            let accID = resp.data.split(":16:")[1].split(":3:")[0];


            let r = await axios.post(server + "getGJUsers20.php", userData, {
                headers: headers
            })
            if(r.data == -1) throw new Error(`Couldn't find a "${username}" user.`)
            if(r.data.toLowerCase() == "error code: 1020") throw new Error("1020 error: Request denied.");
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
                if(res.data.toLowerCase() == "error code: 1020") throw new Error("1020 error: Request denied.");
                throw new Error(`${e}`)
            })

            return 1;
        }
}