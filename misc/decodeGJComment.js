module.exports = {
    decodeGJComment:
        function(comment) {
            const bs = require("js-base64");
            
            let spl = comment.split("~");
            let cmnt = [];
            for(let i =0;i<spl.length;i++) {
              if(i%2!=0) {
                cmnt.push(spl[i-1]+`~`+spl[i]);
              }
            }

            let commentContent = cmnt[0].split("2~")[1];
            let playerID = cmnt[1].split("3~")[1];
            let likes = cmnt[2].split("4~")[1];
            let percent = cmnt[4].split("10~")[1];
            let age = cmnt[5].split("9~")[1];
            let msgID = cmnt[6].split("6~")[1];
            let username = comment.split(":1~")[1].split("~9")[0];
            
            if(msgID.includes(":")) msgID = msgID.split(":")[0];

            const res = {
                username: username,
                content: bs.decode(commentContent.replace(/_/g, '/').replace(/-/g, '+')),
                playerID: Number(playerID),
                likes: Number(likes),
                percent: Number(percent),
                id: Number(msgID),
                age: age
            }
            
            return res;
        }
}