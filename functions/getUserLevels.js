module.exports = {
    getUserLevels:
        async function(str, page = 1) {
            if(!str || str == "") throw new Error("Please provide a username or player ID!");

            const axios = require("axios");
            const { headers, secret, server } = require("../config.json");
            const { getLevelByID } = require("../functions/getLevelByID.js");

            const data = {
                type: 5,
                str: id,
                secret: secret,
                page: Number(page) - 1
            }

            let res = await axios.post(server + "getGJLevels21.php", data, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data);
            })

            let firstLvlId = res.data.split(":")[1].split(":2:")[0];
            let secondLvlId;
            let thirdLvlId;
            let fourthLvlId;
            let fifthLvlId;
            let sixthLvlId;
            let seventhLvlId;
            let eighthLvlId;
            let ninthLvlId;
            let tenthLvlId;

            let firstLvl = await getLevelByID(firstLvlId);
            let secondLvl;
            let thirdLvl;
            let fourthLvl;
            let fifthLvl;
            let sixthLvl;
            let seventhLvl;
            let eighthLvl;
            let ninthLvl;
            let tenthLvl;

            let result = [firstLvl]

            if(res.data.split("|1:").length - 1 == 1) {
                secondLvlId = res.data.split("|1:")[1].split(":2:")[0];
                secondLvl = await getLevelByID(secondLvlId);
                result = [firstLvl,secondLvl]
            }

            if(res.data.split("|1:").length - 1 == 2) {
                secondLvlId = res.data.split("|1:")[1].split(":2:")[0];
                secondLvl = await getLevelByID(secondLvlId);
                thirdLvlId = res.data.split("|1:")[2].split(":2:")[0];
                thirdLvl = await getLevelByID(thirdLvlId);
                result = [firstLvl,secondLvl,thirdLvl]
            }

            if(res.data.split("|1:").length - 1 == 3) {
                secondLvlId = res.data.split("|1:")[1].split(":2:")[0];
                secondLvl = await getLevelByID(secondLvlId);
                thirdLvlId = res.data.split("|1:")[2].split(":2:")[0];
                thirdLvl = await getLevelByID(thirdLvlId);
                fourthLvlId = res.data.split("|1:")[3].split(":2:")[0];
                fourthLvl = await getLevelByID(fourthLvlId);
                result = [firstLvl,secondLvl,thirdLvl,fourthLvl]
            }

            if(res.data.split("|1:").length - 1 == 4) {
                secondLvlId = res.data.split("|1:")[1].split(":2:")[0];
                secondLvl = await getLevelByID(secondLvlId);
                thirdLvlId = res.data.split("|1:")[2].split(":2:")[0];
                thirdLvl = await getLevelByID(thirdLvlId);
                fourthLvlId = res.data.split("|1:")[3].split(":2:")[0];
                fourthLvl = await getLevelByID(fourthLvlId);
                fifthLvlId = res.data.split("|1:")[4].split(":2:")[0];
                fifthLvl = await getLevelByID(fifthLvlId);
                result = [firstLvl,secondLvl,thirdLvl,fourthLvl,fifthLvl]
            }

            if(res.data.split("|1:").length - 1 == 5) {
                secondLvlId = res.data.split("|1:")[1].split(":2:")[0];
                secondLvl = await getLevelByID(secondLvlId);
                thirdLvlId = res.data.split("|1:")[2].split(":2:")[0];
                thirdLvl = await getLevelByID(thirdLvlId);
                fourthLvlId = res.data.split("|1:")[3].split(":2:")[0];
                fourthLvl = await getLevelByID(fourthLvlId);
                fifthLvlId = res.data.split("|1:")[4].split(":2:")[0];
                fifthLvl = await getLevelByID(fifthLvlId);
                sixthLvlId = res.data.split("|1:")[5].split(":2:")[0];
                sixthLvl = await getLevelByID(sixthLvlId);
                result = [firstLvl,secondLvl,thirdLvl,fourthLvl,fifthLvl,sixthLvl]
            }

            if(res.data.split("|1:").length - 1 == 6) {
                secondLvlId = res.data.split("|1:")[1].split(":2:")[0];
                secondLvl = await getLevelByID(secondLvlId);
                thirdLvlId = res.data.split("|1:")[2].split(":2:")[0];
                thirdLvl = await getLevelByID(thirdLvlId);
                fourthLvlId = res.data.split("|1:")[3].split(":2:")[0];
                fourthLvl = await getLevelByID(fourthLvlId);
                fifthLvlId = res.data.split("|1:")[4].split(":2:")[0];
                fifthLvl = await getLevelByID(fifthLvlId);
                sixthLvlId = res.data.split("|1:")[5].split(":2:")[0];
                sixthLvl = await getLevelByID(sixthLvlId);
                seventhLvlId = res.data.split("|1:")[6].split(":2:")[0];
                seventhLvl = await getLevelByID(seventhLvlId);
                result = [firstLvl,secondLvl,thirdLvl,fourthLvl,fifthLvl,sixthLvl,seventhLvl]
            }

            if(res.data.split("|1:").length - 1 == 7) {
                secondLvlId = res.data.split("|1:")[1].split(":2:")[0];
                secondLvl = await getLevelByID(secondLvlId);
                thirdLvlId = res.data.split("|1:")[2].split(":2:")[0];
                thirdLvl = await getLevelByID(thirdLvlId);
                fourthLvlId = res.data.split("|1:")[3].split(":2:")[0];
                fourthLvl = await getLevelByID(fourthLvlId);
                fifthLvlId = res.data.split("|1:")[4].split(":2:")[0];
                fifthLvl = await getLevelByID(fifthLvlId);
                sixthLvlId = res.data.split("|1:")[5].split(":2:")[0];
                sixthLvl = await getLevelByID(sixthLvlId);
                seventhLvlId = res.data.split("|1:")[6].split(":2:")[0];
                seventhLvl = await getLevelByID(seventhLvlId);
                eighthLvlId = res.data.split("|1:")[7].split(":2:")[0];
                eighthLvl = await getLevelByID(eighthLvlId);
                result = [firstLvl,secondLvl,thirdLvl,fourthLvl,fifthLvl,sixthLvl,seventhLvl,eighthLvl]
            }

            if(res.data.split("|1:").length - 1 == 8) {
                secondLvlId = res.data.split("|1:")[1].split(":2:")[0];
                secondLvl = await getLevelByID(secondLvlId);
                thirdLvlId = res.data.split("|1:")[2].split(":2:")[0];
                thirdLvl = await getLevelByID(thirdLvlId);
                fourthLvlId = res.data.split("|1:")[3].split(":2:")[0];
                fourthLvl = await getLevelByID(fourthLvlId);
                fifthLvlId = res.data.split("|1:")[4].split(":2:")[0];
                fifthLvl = await getLevelByID(fifthLvlId);
                sixthLvlId = res.data.split("|1:")[5].split(":2:")[0];
                sixthLvl = await getLevelByID(sixthLvlId);
                seventhLvlId = res.data.split("|1:")[6].split(":2:")[0];
                seventhLvl = await getLevelByID(seventhLvlId);
                eighthLvlId = res.data.split("|1:")[7].split(":2:")[0];
                eighthLvl = await getLevelByID(eighthLvlId);
                ninthLvlId = res.data.split("|1:")[8].split(":2:")[0];
                ninthLvl = await getLevelByID(ninthLvlId);
                result = [firstLvl,secondLvl,thirdLvl,fourthLvl,fifthLvl,sixthLvl,seventhLvl,eighthLvl,ninthLvl]
            }

            if(res.data.split("|1:").length - 1 == 9) {
                secondLvlId = res.data.split("|1:")[1].split(":2:")[0];
                secondLvl = await getLevelByID(secondLvlId);
                thirdLvlId = res.data.split("|1:")[2].split(":2:")[0];
                thirdLvl = await getLevelByID(thirdLvlId);
                fourthLvlId = res.data.split("|1:")[3].split(":2:")[0];
                fourthLvl = await getLevelByID(fourthLvlId);
                fifthLvlId = res.data.split("|1:")[4].split(":2:")[0];
                fifthLvl = await getLevelByID(fifthLvlId);
                sixthLvlId = res.data.split("|1:")[5].split(":2:")[0];
                sixthLvl = await getLevelByID(sixthLvlId);
                seventhLvlId = res.data.split("|1:")[6].split(":2:")[0];
                seventhLvl = await getLevelByID(seventhLvlId);
                eighthLvlId = res.data.split("|1:")[7].split(":2:")[0];
                eighthLvl = await getLevelByID(eighthLvlId);
                ninthLvlId = res.data.split("|1:")[8].split(":2:")[0];
                ninthLvl = await getLevelByID(ninthLvlId);
                tenthLvlId = res.data.split("|1:")[9].split(":2:")[0];
                tenthLvl = await getLevelByID(tenthLvlId);
                result = [firstLvl,secondLvl,thirdLvl,fourthLvl,fifthLvl,sixthLvl,seventhLvl,eighthLvl,ninthLvl,tenthLvl]
            }

            return result;
        }
}