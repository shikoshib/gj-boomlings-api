module.exports = {
    deleteAccountPost:
        async function(id, str, password) {
            const {encURLSafeBase64} = require("./encURLSafeBase64.js");
            if(!id || id == "") throw new Error("Please provide an account post ID!");
            if(!str || str == "") throw new Error("Please provide a user ID or name!");
            if(!password || password == "") throw new Error("Please provide a password!");

            const axios = require("axios");
            const { headers, server } = require("../config.json");

            const data = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: str,
                secret: "Wmfd2893gb7"
            };

            let r = await axios.post(server + "getGJUsers20.php", data, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data);
            })

            if(r.data == -1) throw new Error("-1 This user is not found.")

            let accId = r.data.split(":16:")[1].split(":3:")[0];
            if(Number(accId) < 71 || accId.includes(":")) accId = r.data.split(":16:")[2].split(":3:")[0];

            const XOR = require("../misc/xor.js");
            const xor = new XOR();

            let dACdata = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                accountID: accId,
                secret: "Wmfd2893gb7",
                gjp: xor.encrypt(password, 37526),
                commentID: id,
            };

            let res = await axios.post(server + "deleteGJAccComment20.php", dACdata, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data);
            })

            return 1;
        }
}