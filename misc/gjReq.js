module.exports = {
    gjReq:
        async function(endpoint, data) {
            const { server } = require("../config.json");
            
            let r = await fetch(`${server}${endpoint.endsWith(".php") ? endpoint.split(".php")[0] : endpoint}.php`, {
                method: 'POST',
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded",
                    "user-agent":"",
                    "Accept-Encoding":"*",
                    "Accept":"*/*"
                },
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