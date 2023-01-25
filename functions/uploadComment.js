module.exports = {
    uploadComment:
        async function(comment, id, user, password, percent = 0) {
            if(!comment || comment == "") throw new Error("Please provide a comment!");
            if(!id || id == "") throw new Error("Please provide a level ID!");
            if(!user || user == "") throw new Error("Please provide a username or a player ID!");
            if(!password || password == "") throw new Error("Please provide a password!");
            if(Number(percent) > 100) throw new Error("The percentage cannot be more than 100!");

            const { gjp } = require("../misc/gjp.js");
            const { encB64 } = require("../misc/encB64.js");
            const {gjReq} = require("../misc/gjReq.js");
            const crypto = require('crypto')
            const { searchUsers } = require("./searchUsers.js");

            function sha1(data) {
                return crypto.createHash("sha1").update(data, "binary").digest("hex");
            }

            let userObj = await searchUsers(user);
            
            const XOR = require("../misc/xor.js");
            const xor = new XOR();

            let chkStr = userObj.username + encB64(comment) + Number(id) + Number(percent) + "0xPT6iUrtws0J";
            let chk = xor.encrypt(sha1(chkStr), 29481);

            const uCdata = {
                accountID: userObj.accountID,
                gjp: gjp(password),
                userName: userObj.username,
                comment: encB64(comment),
                levelID: id,
                percent: percent,
                chk: chk,
                secret: "Wmfd2893gb7"
            }

            let res = await gjReq("uploadGJComment21", uCdata);

            if(res.data == -1) throw new Error("Whoops, the servers have rejected your request!");
            if(res.data == -10) throw new Error("You're permanently banned from commenting!");
            if(res.data.startsWith("temp_")) throw new Error(`You're temporarily banned from commenting!\nRemaining duration: ${edata.split("_")[1]}\nReason: ${edata.split("_")[2]}`);

            return res.data;
        }
}