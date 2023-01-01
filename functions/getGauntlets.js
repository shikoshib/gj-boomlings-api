module.exports = {
    getGauntlets: 
        async function() {
            const axios = require('axios');
            const {headers, server} = require("../config.json");
            const { decodeGJGauntlet } = require("../misc/decodeGJGauntlet.js")

            const data = {
                secret: "Wmfd2893gb7",
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0
            }

            let res = await axios.post(server + "getGJGauntlets21.php", data, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data);
            })

            let first = res.data.split("|")[0];
            let second = res.data.split("|")[1].split("|")[0];
            let third = res.data.split("|")[2].split("|")[0];
            let fourth = res.data.split("|")[3].split("|")[0];
            let fifth = res.data.split("|")[4].split("|")[0];
            let sixth = res.data.split("|")[5].split("|")[0];
            let seventh = res.data.split("|")[6].split("|")[0];
            let eighth = res.data.split("|")[7].split("|")[0];
            let ninth = res.data.split("|")[8].split("|")[0];
            let tenth = res.data.split("|")[9].split("|")[0];
            let eleventh = res.data.split("|")[10].split("|")[0];
            let twelfth = res.data.split("|")[11].split("|")[0];
            let thirteenth = res.data.split("|")[12].split("|")[0];
            let fourteenth = res.data.split("|")[13].split("|")[0];
            let fifteenth = res.data.split("|")[14].split("|")[0];

            const result = [
                decodeGJGauntlet(first),
                decodeGJGauntlet(second),
                decodeGJGauntlet(third),
                decodeGJGauntlet(fourth),
                decodeGJGauntlet(fifth),
                decodeGJGauntlet(sixth),
                decodeGJGauntlet(seventh),
                decodeGJGauntlet(eighth),
                decodeGJGauntlet(ninth),
                decodeGJGauntlet(tenth),
                decodeGJGauntlet(eleventh),
                decodeGJGauntlet(twelfth),
                decodeGJGauntlet(thirteenth),
                decodeGJGauntlet(fourteenth),
                decodeGJGauntlet(fifteenth),
            ]

            return result;
        }
}