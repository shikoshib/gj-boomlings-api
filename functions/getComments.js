module.exports = {
    getComments:
        async function(level, page = 1, mode = 1) {
            if(!level || level == "") throw new Error("Please provide a level ID!");
            if(isNaN(level)) throw new Error("A level ID should be a number.");
            const axios = require("axios");
            const {headers, server} = require("../config.json");
            const { decodeGJComment } = require("../misc/decodeGJComment.js");

            const data = {
                levelID: level,
                page: page - 1,
                mode: mode,
                secret: "Wmfd2893gb7",
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0
            }

            let res = await axios.post(server + "getGJComments21.php", data, {
                headers: headers
            }).catch(e => {
                if(e.response.data == -1) throw new Error("-1 This user is not found.");
                throw new Error(e.response.data);
            })
            
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

            let result = [decodeGJComment(firstComment)]

            if(res.data.split("|").length - 1 == 1) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                result.push(decodeGJComment(secondComment))
            }

            if(res.data.split("|").length - 1 == 2) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                result.push(decodeGJComment(secondComment),decodeGJComment(thirdComment))
            }

            if(res.data.split("|").length - 1 == 3) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                fourthComment = res.data.split("|")[3].split("|")[0];
                result.push(decodeGJComment(secondComment),decodeGJComment(thirdComment),decodeGJComment(fourthComment))
            }

            if(res.data.split("|").length - 1 == 4) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                fourthComment = res.data.split("|")[3].split("|")[0];
                fifthComment = res.data.split("|")[4].split("|")[0];
                result.push(decodeGJComment(secondComment),decodeGJComment(thirdComment),decodeGJComment(fourthComment),decodeGJComment(fifthComment))
            }

            if(res.data.split("|").length - 1 == 5) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                fourthComment = res.data.split("|")[3].split("|")[0];
                fifthComment = res.data.split("|")[4].split("|")[0];
                sixthComment = res.data.split("|")[5].split("|")[0];
                result.push(decodeGJComment(secondComment),decodeGJComment(thirdComment),decodeGJComment(fourthComment),decodeGJComment(fifthComment),decodeGJComment(sixthComment))
            }

            if(res.data.split("|").length - 1 == 6) {
                firstComment = res.data.split("|")[0];
                secondComment = res.data.split("|")[1].split("|")[0];
                thirdComment = res.data.split("|")[2].split("|")[0];
                fourthComment = res.data.split("|")[3].split("|")[0];
                fifthComment = res.data.split("|")[4].split("|")[0];
                sixthComment = res.data.split("|")[5].split("|")[0];
                seventhComment = res.data.split("|")[6].split("|")[0];
                result.push(decodeGJComment(secondComment),decodeGJComment(thirdComment),decodeGJComment(fourthComment),decodeGJComment(fifthComment),decodeGJComment(sixthComment),decodeGJComment(seventhComment))
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
                result.push(decodeGJComment(secondComment),decodeGJComment(thirdComment),decodeGJComment(fourthComment),decodeGJComment(fifthComment),decodeGJComment(sixthComment),decodeGJComment(seventhComment),decodeGJComment(eighthComment))
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
                result.push(decodeGJComment(secondComment),decodeGJComment(thirdComment),decodeGJComment(fourthComment),decodeGJComment(fifthComment),decodeGJComment(sixthComment),decodeGJComment(seventhComment),decodeGJComment(eighthComment),decodeGJComment(ninthComment))
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
                result.push(decodeGJComment(secondComment),decodeGJComment(thirdComment),decodeGJComment(fourthComment),decodeGJComment(fifthComment),decodeGJComment(sixthComment),decodeGJComment(seventhComment),decodeGJComment(eighthComment),decodeGJComment(ninthComment),decodeGJComment(tenthComment))
            }

            return result;
        }
}