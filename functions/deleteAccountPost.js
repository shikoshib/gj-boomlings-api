module.exports = {
    deleteAccountPost:
        async function(id, str, password) {
            if(!id || id == "") throw new Error("Please provide an account post ID!");
            if(!str || str == "") throw new Error("Please provide a user ID or name!");
            if(!password || password == "") throw new Error("Please provide a password!");

            const axios = require("axios");
            const { headers, server } = require("../config.json");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(str);

            const XOR = require("../misc/xor.js");
            const xor = new XOR();

            let dACdata = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                accountID: user.accountID,
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