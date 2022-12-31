module.exports = {
    getCommentHistory:
        async function(str, page = 1, mode = 1) {
            if(!str || str == "") throw new Error("Please provide a player ID or name!");
            const axios = require("axios");
            const {headers, server} = require("../config.json");
            const {decCommentFromHistory} = require("../misc/decCommentFromHistory.js");
            const {getProfile} = require("./getProfile.js");

            const userData = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: str,
                secret: "Wmfd2893gb7"
            }

            let r = await axios.post(server + "getGJUsers20.php", userData, {
                headers: headers
            })

            if(r.data == -1) throw new Error("-1 Not found.");
            if(r.data.toLowerCase() == "error code: 1020") throw new Error("1020 error: Request denied.");
            if(r.data.toLowerCase() == "error code: 1005") throw new Error("1005 error: Your IP address has been blocked from sending requests to a server. It's recommended to use locally (directly from a PC).")
            
            let id = r.data.split(":2:")[1].split(":13:")[0];

            const user = await getProfile(id);
            if(user.commentHistory != "all") throw new Error("Whoops! This user has disabled viewing his comment history!")

            const CHData = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                secret: "Wmfd2893gb7",
                userID: id,
                page: page - 1,
                mode: 1
            }

            let res = await axios.post(server + "getGJCommentHistory.php", CHData, {
                headers: headers
            })
            
            if(res.data == -1) throw new Error("-1 Not found.");
            if(res.data.toLowerCase() == "error code: 1020") throw new Error("1020 error: Request denied.");
            if(res.data.toLowerCase() == "error code: 1005") throw new Error("1005 error: Your IP address has been blocked from sending requests to a server. It's recommended to use locally (directly from a PC).")
            

            let firstComment = res.data;
            let secondComment;
            let thirdComment;
            let fourthComment;
            let fifthComment;
            let sixthComment;
            let seventhComment;
            let eighthComment;
            let ninthComment;
            let tenthComment;

            let result = [decCommentFromHistory(firstComment)]

            if(res.data.split("|").length - 1 == 1) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                result.push(decCommentFromHistory(secondComment))
            }

            if(res.data.split("|").length - 1 == 2) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                result.push(decCommentFromHistory(secondComment),decCommentFromHistory(thirdComment))
            }

            if(res.data.split("|").length - 1 == 3) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                fourthComment = res.data.split("|")[3].split("|")[0];
                result.push(decCommentFromHistory(secondComment),decCommentFromHistory(thirdComment),decCommentFromHistory(fourthComment))
            }

            if(res.data.split("|").length - 1 == 4) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                fourthComment = res.data.split("|")[3].split("|")[0];
                fifthComment = res.data.split("|")[4].split("|")[0];
                result.push(decCommentFromHistory(secondComment),decCommentFromHistory(thirdComment),decCommentFromHistory(fourthComment),decCommentFromHistory(fifthComment))
            }

            if(res.data.split("|").length - 1 == 5) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                fourthComment = res.data.split("|")[3].split("|")[0];
                fifthComment = res.data.split("|")[4].split("|")[0];
                sixthComment = res.data.split("|")[5].split("|")[0];
                result.push(decCommentFromHistory(secondComment),decCommentFromHistory(thirdComment),decCommentFromHistory(fourthComment),decCommentFromHistory(fifthComment),decCommentFromHistory(sixthComment))
            }

            if(res.data.split("|").length - 1 == 6) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                fourthComment = res.data.split("|")[3].split("|")[0];
                fifthComment = res.data.split("|")[4].split("|")[0];
                sixthComment = res.data.split("|")[5].split("|")[0];
                seventhComment = res.data.split("|")[6].split("|")[0];
                result.push(decCommentFromHistory(secondComment),decCommentFromHistory(thirdComment),decCommentFromHistory(fourthComment),decCommentFromHistory(fifthComment),decCommentFromHistory(sixthComment),decCommentFromHistory(seventhComment))
            }

            if(res.data.split("|").length - 1 == 7) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                fourthComment = res.data.split("|")[3].split("|")[0];
                fifthComment = res.data.split("|")[4].split("|")[0];
                sixthComment = res.data.split("|")[5].split("|")[0];
                seventhComment = res.data.split("|")[6].split("|")[0];
                eighthComment = res.data.split("|")[7].split("|")[0];
                result.push(decCommentFromHistory(secondComment),decCommentFromHistory(thirdComment),decCommentFromHistory(fourthComment),decCommentFromHistory(fifthComment),decCommentFromHistory(sixthComment),decCommentFromHistory(seventhComment),decCommentFromHistory(eighthComment))
            }

            if(res.data.split("|").length - 1 == 8) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                fourthComment = res.data.split("|")[3].split("|")[0];
                fifthComment = res.data.split("|")[4].split("|")[0];
                sixthComment = res.data.split("|")[5].split("|")[0];
                seventhComment = res.data.split("|")[6].split("|")[0];
                eighthComment = res.data.split("|")[7].split("|")[0];
                ninthComment = res.data.split("|")[8].split("|")[0];
                result.push(decCommentFromHistory(secondComment),decCommentFromHistory(thirdComment),decCommentFromHistory(fourthComment),decCommentFromHistory(fifthComment),decCommentFromHistory(sixthComment),decCommentFromHistory(seventhComment),decCommentFromHistory(eighthComment),decCommentFromHistory(ninthComment))
            }

            if(res.data.split("|").length - 1 == 9) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                fourthComment = res.data.split("|")[3].split("|")[0];
                fifthComment = res.data.split("|")[4].split("|")[0];
                sixthComment = res.data.split("|")[5].split("|")[0];
                seventhComment = res.data.split("|")[6].split("|")[0];
                eighthComment = res.data.split("|")[7].split("|")[0];
                ninthComment = res.data.split("|")[8].split("|")[0];
                tenthComment = res.data.split("|")[9].split("|")[0];
                result.push(decCommentFromHistory(secondComment),decCommentFromHistory(thirdComment),decCommentFromHistory(fourthComment),decCommentFromHistory(fifthComment),decCommentFromHistory(sixthComment),decCommentFromHistory(seventhComment),decCommentFromHistory(eighthComment),decCommentFromHistory(ninthComment),decCommentFromHistory(tenthComment))
            }

            return result;
        }
}