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
            let rank = userInfo[4].split("6:")[1];
            let accID = userInfo[10].split("16:")[1];
            let stars = userInfo[11].split("3:")[1];
            let cp = userInfo[12].split("8:")[1];
            let diamonds = userInfo[13].split("46:")[1];
            let demons = userInfo[14].split("4:")[1];

            const result = {
                username: name.trim(),
                playerID: Number(playerID),
                accountID: Number(accID),
                rank: Number(rank),
                color1: Number(p1col),
                color2: Number(p2col),
                stars: Number(stars),
                diamonds: Number(diamonds),
                secretCoins: Number(coins),
                userCoins: Number(userCoins),
                demons: Number(demons),
                creatorPoints: Number(cp)
            }

            return result;
        }
}