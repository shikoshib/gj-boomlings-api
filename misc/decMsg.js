module.exports = {
    decMsg:
        function(msg) {
            const {decB64} = require("./decB64.js");

            let spl = msg.split("#")[0].split(":");
            let msgInfo = [];
            for(let i =0;i<spl.length;i++) {
              if(i%2!=0) {
                msgInfo.push(spl[i-1]+`:`+spl[i]);
              }
            }

            let username = msgInfo[0].split("6:")[1];
            let playerID = msgInfo[1].split("3:")[1];
            let accID = msgInfo[2].split("2:")[1];
            let msgID = msgInfo[3].split("1:")[1];
            let title = msgInfo[4].split("4:")[1];
            let age = msgInfo[7].split("7:")[1];

            return {
                username: username,
                title: decB64(title),
                playerID: Number(playerID),
                accountID: Number(accID),
                messageID: Number(msgID),
                age: age
            };
        }
}