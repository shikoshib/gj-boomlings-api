module.exports = {
    gjReq:
        async function(endpoint, data) {
            const { server } = require("../config.json");
            let headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": " ",
                "Accept-Encoding": "*",
                "Accept": "*/*"
            }
            
            let r = await fetch(`${server}${endpoint.endsWith(".php") ? endpoint.split(".php")[0] : endpoint}.php`, {
                method: 'POST',
                headers: headers,
                body: new URLSearchParams(data)
            })

            let res = await r.text()
            
            return {
                data: res,
                status: r.status
            };
    }
}