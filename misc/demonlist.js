module.exports = {
    demonlist:
        async function(name) {
            const axios = require("axios");
            let r = await axios.get(`https://pointercrate.com/api/v2/demons/?name=${name}`);
            if(r.data == "[]") return null;
            
            const res = {
                "position": r.data[0].position,
                "publisher": r.data[0].publisher.name,
                "verifier": r.data[0].verifier.name,
            }
                
            return res;
        }
}