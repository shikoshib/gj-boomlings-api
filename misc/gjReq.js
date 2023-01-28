module.exports = {
    gjReq:
        async function(endpoint, data) {
            const { server } = require("../config.json");
            let headers = new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": " ",
                "Accept-Encoding": "*",
                "Accept": "*/*"
            })
            
            let r = await fetch(`${server}${endpoint.endsWith(".php") ? endpoint.split(".php")[0] : endpoint}.php`, {
                method: 'POST',
                mode: "no-cors",
                headers: headers,
                body: new URLSearchParams(data)
            })

            let res = await r.text()
            if(res.toLowerCase() == "error code: 1005") throw new Error("1005 Error: Your IP is banned from making requests to this server.");
            
            return {
                data: res,
                status: r.status
            };
    }
}