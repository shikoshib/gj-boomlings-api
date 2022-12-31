# getCreatorScores()

Gets the top 100 creators leaderboard, sorted by creator points.

## Parameters
None!

## Example
```js
const gd = require("gj-boomlings-api");
gd.getCreatorScores().then(console.log);
```

## Response
```
[
  {
    username: 'YunHaSeu14',
    playerID: 36314,
    accountID: 1187377,
    rank: 1,
    stars: 33615,
    diamonds: 68501,
    secretCoins: 121,
    userCoins: 9431,
    demons: 123,
    creatorPoints: 290
  },
  {
    username: 'ViPriN',
    playerID: 1078150,
    accountID: 2795,
    rank: 2,
    stars: 29533,
    diamonds: 28327,
    secretCoins: 149,
    userCoins: 3256,
    demons: 1026,
    creatorPoints: 281
  },
  {
    username: 'Serponge',
    playerID: 4170784,
    accountID: 119741,
    rank: 3,
    stars: 85,
    diamonds: 17,
    secretCoins: 0,
    userCoins: 5,
    demons: 1,
    creatorPoints: 234
  }
...and so on
```

This function returns an array of [user objects](./objects/user.md).

---

**NOTE:** Here, the users' rank is their actual position on the leaderboard.