module.exports = {
    getMapPacks:
        async function(page = 1) {
            const { decodeMapPack } = require("../misc/decodeMapPack.js");
            const axios = require("axios");
            const { headers, server } = require("../config.json");
            const data = {
                secret: "Wmfd2893gb7",
                page: page - 1
            }

            let res = await axios.post(server + "getGJMapPacks21.php", data, {
                headers: headers
            })

            let firstMapPack = res.data.split("|")[0];
            let secondMapPack = res.data.split("|")[1].split("|")[0];
            let thirdMapPack = res.data.split("|")[2].split("|")[0];
            let fourthMapPack = res.data.split("|")[3].split("|")[0];
            let fifthMapPack = res.data.split("|")[4].split("|")[0];
            let sixthMapPack;
            let seventhMapPack;
            let eighthMapPack;
            let ninthMapPack;
            let tenthMapPack;
            let result = [decodeMapPack(firstMapPack),decodeMapPack(secondMapPack),decodeMapPack(thirdMapPack),decodeMapPack(fourthMapPack),decodeMapPack(fifthMapPack)]

            if(res.data.split("|").length - 1 == 9) {
                sixthMapPack = res.data.split("|")[5].split("|")[0];
                seventhMapPack = res.data.split("|")[6].split("|")[0];
                eighthMapPack = res.data.split("|")[7].split("|")[0];
                ninthMapPack = res.data.split("|")[8].split("|")[0];
                tenthMapPack = res.data.split("|")[9].split("|")[0];
                result.push(decodeMapPack(sixthMapPack),decodeMapPack(seventhMapPack),decodeMapPack(eighthMapPack),decodeMapPack(ninthMapPack),decodeMapPack(tenthMapPack))
            }

            return result;
        }
}