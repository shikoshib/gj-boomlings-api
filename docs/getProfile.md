# getProfile()

Gets someone's profile and decodes it.

## Parameters
`user` - the player's username or a player ID.

## Example
```js
const gd = require("gj-boomlings-api");
gd.getProfile("robtop").then(console.log);
```

## Response
```
{
  username: 'RobTop',
  playerID: 16,
  accountID: 71,
  rank: 219796,
  stars: 2375,
  diamonds: 2170,
  secretCoins: 3,
  userCoins: 140,
  demons: 5,
  creatorPoints: 0,
  messages: 'none',
  friendRequests: 'none',
  commentHistory: 'all',
  mod: 'elder',
  youtube: 'https://youtube.com/channel/UCz_yk8mDSAnxJq0ar66L4sw',
  twitter: 'https://twitter.com/RobTopGames',
  twitch: 'https://twitch.tv/robtopgames'
}
```
Returns a [user object](./objects/user.md).