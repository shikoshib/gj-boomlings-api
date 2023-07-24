module.exports = {
    /**
     * Searches for users.
     * @param {*} str - The search query.
     */
    searchUsers:
        async function(str) {
            if(!str) throw new Error("Please provide a query!");
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            let GJDecode = require("../misc/GJDecode.js");
            const { decodeUserResult } = new GJDecode();

            let res = await gjReq("getGJUsers20", {
                str: str,
                secret: "Wmfd2893gb7"
            })

            if(res.data == -1) throw new Error(`Couldn't find a "${str}" user.`);
            if(res.data == "error code: 1005") {
                res = await gjWReq("searchUsers", str);
                if(res.status == 403) throw new Error(res.data.error);
            }

            return decodeUserResult(res.data);
        }
}