module.exports = {
    uploadAccountPost:
        async function(content, str, password) {
            const {encURLSafeBase64} = require("./encURLSafeBase64.js");
            if(!content || content == "") throw new Error("Please provide an account post content!");
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
            })

            if(r.data == -1) throw new Error("-1 This user is not found.")
            let id = r.data.split(":16:")[1].split(":3:")[0];
            if(Number(id) < 71 || id.includes(":")) id = r.data.split(":16:")[2].split(":3:")[0];

            const XOR = require("../misc/xor.js");
            const xor = new XOR();
            
            const comment = encURLSafeBase64(content);

            let uACdata = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                accountID: id,
                secret: "Wmfd2893gb7",
                gjp: xor.encrypt(password, 37526),
                comment: comment,
                cType: 1
            };

            let res = await axios.post(server + "uploadGJAccComment20.php", uACdata, {
                headers: headers
            }).catch(e => {
                if(e.response.status == 500) throw new Error("500 Error: couldn't post!");
            })
            
            if(res.data.toString().toLowerCase() == "error code: 1005") throw new Error("1005 error: Your IP address has been blocked from sending requests to a server. It's recommended to use locally (directly from a PC).")

            return 1;
        }
}