module.exports = {
    decodeGJComment:
        function(comment) {
            const bs = require("js-base64");

            let commentContent = comment.split("2~")[1].split("~3~")[0];
            let playerID = comment.split("~3~")[1].split("~4~")[0];
            let likes = comment.split("~4~")[1].split("~7~")[0];
            let isSpam = comment.split("~7~")[1].split("~10~")[0];
            let percent = comment.split("~10~")[1].split("~9~")[0];
            let age = comment.split("~9~")[1].split("~6~")[0];
            let messageID = comment.split("~6~")[1].split(":1~")[0];
            let username = comment.split(":1~")[1].split("~9~")[0];

            if(messageID.includes("~")) messageID = comment.split("~6~")[1].split("~11~")[0];

            let isSpamDecoding = {
                "0": false,
                "1": true
            }
            
            const res = {
                username: username,
                content: bs.decode(commentContent.replace(/_/g, '/').replace(/-/g, '+')),
                playerID: Number(playerID),
                likes: Number(likes),
                percent: Number(percent),
                id: Number(messageID),
                age: age,
                isSpam: isSpamDecoding[isSpam]
            }
            
            return res;
        }
}