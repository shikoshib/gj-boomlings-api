module.exports = {
    decodeUserResult:
        function(user) {
            let sec = user.split(":16:")[1]
            if(user.split(":16:")[2] != undefined) sec = user.split(":16:")[2]
            let userWoSkins = `${user.split(":9:")[0]}:16:${sec}`
            
            let name = userWoSkins.split(":")[1].split(":2:")[0];
            let playerID = userWoSkins.split(":2:")[1].split(":13:")[0];
            let coins = userWoSkins.split(":13:")[1].split(":17:")[0];
            let userCoins = userWoSkins.split(":17:")[1].split(":6:")[0];
            let rank = userWoSkins.split(":6:")[1].split(":9:")[0];
            let accID = userWoSkins.split(":16:")[1].split(":3:")[0];
            let stars = userWoSkins.split(":3:")[1].split(":8:")[0];
            let cp = userWoSkins.split(":8:")[1].split(":46:")[0];
            let diamonds = userWoSkins.split(":46:")[1].split(":4:")[0];
            let demons = userWoSkins.split(":4:")[1]
            
            if(userWoSkins.split(":3:")[1] != undefined) {
                if(userWoSkins.split(":3:")[1].split(":").length < 6) stars = userWoSkins.split(":2:")[1].split(":8:")[0];
            }
            if(rank.includes(":16:")) rank = rank.split(":16:")[0];
            if(userWoSkins.split(":6:")[2] != undefined) {
                if(rank.includes(":")) rank = userWoSkins.split(":6:")[2].split(":9:")[0];
            }
            
            if(demons.includes(":")) demons = userWoSkins.split(":4:")[2]
            if(userCoins.includes(":6")) userCoins = userCoins.split(":6")[0];
            if(accID.startsWith("16:")) accID = accID.split("16:")[1];
            if(stars.includes(":3:")) stars = stars.split(":3:")[1];
            if(stars.includes("16:")) stars = userWoSkins.split(":3:")[2].split(":8:")[0];
            if(diamonds.includes(":")) diamonds = userWoSkins.split(":46:")[2].split(":4:")[0];
            if(cp.includes(":")) cp = userWoSkins.split(":8:")[2].split(":46:")[0];
            if(rank.startsWith("16:")) rank = "9"
            if(rank.includes(":16:")) rank = rank.split(":16:")[0];
            if(accID.includes(":")) accID = userWoSkins.split(":16:")[2].split(":3:")[0];

            const result = {
                username: name.trim(),
                playerID: Number(playerID),
                accountID: Number(accID),
                rank: Number(rank),
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