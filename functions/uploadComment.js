module.exports = {
    uploadComment:
        async function(comment, id, user, password, percent = 0) {
            if(!comment || comment == "") throw new Error("Please provide a comment!");
            if(!id || id == "") throw new Error("Please provide a level ID!");
            if(!user || user == "") throw new Error("Please provide a username or a player ID!");
            if(!password || password == "") throw new Error("Please provide a password!");
            if(Number(percent) > 100) throw new Error("The percentage cannot be more than 100!");

            const { gjp } = require("../misc/gjp.js");
            const { encURLSafeBase64 } = require("./encURLSafeBase64.js");
            const axios = require("axios");
            const { headers, server } = require("../config.json");
            const crypto = require('crypto')

            function sha1(data) {
                return crypto.createHash("sha1").update(data, "binary").digest("hex");
            }

            const data = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: user,
                secret: "Wmfd2893gb7"
            };

            let r = await axios.post(server + "getGJUsers20.php", data, {
                headers: headers
            })

            if(r.data == -1) throw new Error("-1 This user is not found.")
            let username = r.data.split("1:")[1].split(":2:")[0];
            let accID = r.data.split(":16:")[1].split(":3:")[0];
            if(Number(accID) < 71 || accID.includes(":")) accID = r.data.split(":16:")[2].split(":3:")[0];
            
            const XOR = require("../misc/xor.js");
            const xor = new XOR();

            let chkStr = username + encURLSafeBase64(comment) + Number(id) + Number(percent) + "0xPT6iUrtws0J";
            let chk = xor.encrypt(sha1(chkStr), 29481);

            const uCdata = {
                accountID: accID,
                gjp: gjp(password),
                userName: username,
                comment: encURLSafeBase64(comment),
                levelID: id,
                percent: percent,
                chk: chk,
                secret: "Wmfd2893gb7"
            }

            let res = await axios.post(server + "uploadGJComment21.php", uCdata, {
                headers: headers
            }).catch(e => {
                let edata = e.response.data;
                if(edata == '') edata = "Whoops, the servers have rejected your request!"
                throw new Error(edata)
            })

            return 1;
        }
}