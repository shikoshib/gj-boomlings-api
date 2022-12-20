module.exports = {
    getComments:
        async function(level, page = 1, mode = 1) {
            const axios = require("axios");
            const {headers} = require("../config.json");
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

            let res = await axios.post("http://www.boomlings.com/database/getGJComments21.php", data, {
                headers: headers
            })

            const firstComment = res.data.split("|")[0];
            const secondComment = res.data.split("|")[1].split("|")[0];
            const thirdComment = res.data.split("|")[2].split("|")[0];
            const fourthComment = res.data.split("|")[3].split("|")[0];
            const fifthComment = res.data.split("|")[4].split("|")[0];
            const sixthComment = res.data.split("|")[5].split("|")[0];
            const seventhComment = res.data.split("|")[6].split("|")[0];
            const eighthComment = res.data.split("|")[7].split("|")[0];
            const ninthComment = res.data.split("|")[8].split("|")[0];
            const tenthComment = res.data.split("|")[9].split("|")[0];

            const result = [decodeGJComment(firstComment),decodeGJComment(secondComment),decodeGJComment(thirdComment),decodeGJComment(fourthComment),decodeGJComment(fifthComment),decodeGJComment(sixthComment),decodeGJComment(seventhComment),decodeGJComment(eighthComment),decodeGJComment(ninthComment),decodeGJComment(tenthComment)]

            return result;
        }
}