module.exports = {
    gjWReq:
        async function(endpoint, data = "") {
            let r = await fetch(`https://gbaweb.vercel.app/${endpoint}/${data}`)
            let res = await r.text()
            if(res.includes("{") || res.includes("[")) res = JSON.parse(res);
            
            return {data: res, status: r.status};
    }
}