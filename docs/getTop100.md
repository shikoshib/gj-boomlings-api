# getTop100()

Gets the top 100 players leaderboard, sorted by stars.

## Parameters
None!

## Example
```js
const gd = require("gj-boomlings-api");
gd.getTop100().then(console.log);
```

## Response
```
[
  {
    username: 'Smiffy777',
    playerID: 7708568,
    accountID: 1413859,
    rank: 1,
    stars: 227040,
    diamonds: 156320,
    secretCoins: 149,
    userCoins: 45920,
    demons: 5581,
    creatorPoints: 0
  },
  {
    username: 'Gormuck',
    playerID: 8247386,
    accountID: 1775477,
    rank: 2,
    stars: 222121,
    diamonds: 166422,
    secretCoins: 149,
    userCoins: 28509,
    demons: 5050,
    creatorPoints: 2
  },
  {
    username: 'volplay',
    playerID: 14188128,
    accountID: 5189757,
    rank: 3,
    stars: 221320,
    diamonds: 121349,
    secretCoins: 149,
    userCoins: 25076,
    demons: 5291,
    creatorPoints: 2
  }
...and so on
```

This function returns an array of [user objects](./objects/user.md).