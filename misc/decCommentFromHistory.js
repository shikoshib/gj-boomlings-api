module.exports = {
    decCommentFromHistory:
        function(comment) {
            const {decB64} = require("./decB64.js");

            let spl = comment.split('~');
            let cmnt = [];
            for(let i =0;i<spl.length;i++) {
              if(i%2!=0) {
                cmnt.push(spl[i-1]+`~`+spl[i]);
              }
            }

            let levelID = cmnt[1].split("~")[1];
            let commentContent = cmnt[0].split("~")[1];
            let playerID = cmnt[2].split("~")[1];
            let likes = cmnt[3].split("~")[1];
            let percent = cmnt[4].split("~")[1];
            let age = cmnt[5].split("~")[1];
            let messageID = cmnt[6].split("~")[1].split(":")[0];
            let username = cmnt[7].split("~")[0];
            
            const res = {
                username: username,
                content: decB64(commentContent),
                levelID: Number(levelID),
                playerID: Number(playerID),
                likes: Number(likes),
                percent: Number(percent),
                id: Number(messageID),
                age: age
            }

            return res;
        }
}