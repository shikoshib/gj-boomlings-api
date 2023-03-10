module.exports = {
    decodeUserResult:
        function(user) {
            let spl = user.split(':');
            let userInfo = [];
            for(let i =0;i<spl.length;i++) {
              if(i%2!=0) {
                userInfo.push(spl[i-1]+`:`+spl[i]);
              }
            }

            let name = userInfo[0].split("1:")[1];
            let playerID = userInfo[1].split("2:")[1];
            let coins = userInfo[2].split("13:")[1];
            let userCoins = userInfo[3].split("17:")[1];
            let p1col = userInfo[6].split("10:")[1];
            let p2col = userInfo[7].split("11:")[1];
            let accID = userInfo[10].split("16:")[1];
            let stars = userInfo[11].split("3:")[1];
            let cp = userInfo[12].split("8:")[1];
            let demons = userInfo[13].split("4:")[1].split("#")[0];

            let colors = require("./colors.json");
            const { rgbToHEX } = require("./rgbToHEX.js");

            const result = {
                username: name.trim(),
                playerID: Number(playerID),
                accountID: Number(accID),
                color1: rgbToHEX(colors[p1col]),
                color2: rgbToHEX(colors[p2col]),
                stars: Number(stars),
                secretCoins: Number(coins),
                userCoins: Number(userCoins),
                demons: Number(demons),
                creatorPoints: Number(cp)
            }

            return result;
        }
}