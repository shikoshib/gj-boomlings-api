const fetch = require("node-fetch");
module.exports = {
    gjReq: async function (endpoint, data) {
        let r = await fetch(`https://www.boomlings.com/database/${endpoint.endsWith(".php") ? endpoint.split(".php")[0] : endpoint}.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": " "
            },
            body: new URLSearchParams(data)
        });
        let res = await r.text();
        return {
            data: res,
            status: r.status
        }
    }
};