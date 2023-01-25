module.exports = {
    searchUsers:
        async function(str) {
            if(!str || str == '') throw new Error("Please provide a query!");

            const {gjReq} = require("../misc/gjReq.js");
            const { decodeUserResult } = require("../misc/decodeUserResult.js");

            let res = await gjReq("getGJUsers20", {
                str: str,
                secret: "Wmfd2893gb7"
            })

            if(res.data == -1) throw new Error(`Couldn't find a "${str}" user.`)

            return decodeUserResult(res.data);
        }
}