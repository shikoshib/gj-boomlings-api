<div align="center">
  <a href="https://www.npmjs.com/package/gj-boomlings-api"><img src="https://shikoshib.github.io/font1.png" width="600"></a><hr>
  <a href="https://www.npmjs.com/package/gj-boomlings-api"><img src="https://img.shields.io/npm/v/gj-boomlings-api.svg?maxAge=3600" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/gj-boomlings-api"><img src="https://img.shields.io/npm/dm/gj-boomlings-api.svg?maxAge=2592000" /></a>
  <a href="https://snyk.io/test/github/shikoshib/gj-boomlings-api"><img src="https://snyk.io/test/github/shikoshib/gj-boomlings-api/badge.svg" alt="Known Vulnerabilities" /></a>
  <a href="https://packagequality.com/#?package=gj-boomlings-api"><img src="https://packagequality.com/shield/gj-boomlings-api.svg"/></a>
</div>

This package gets info from RobTop's servers (boomlings.com) and converts it into pure and beautiful JSON.

## Functions

### dlLevel(id)

So basically this function downloads the entire level and converts the response into JSON.

```js
const gd = require("gj-boomlings-api");
gd.dlLevel(42584142).then(console.log);
```

Returns:

```
{
  id: 42584142,
  name: 'Bloodlust',
  description: 'Your thirst for blood continues? Very well, let the blood spill. Let the demons feed off your unfortunate soul...',
  creator: 'Knobbelboy',
  level_version: 3,
  difficulty: 'Extreme Demon',
  stars: 10,
  downloads: 18914789,
  likes: 697155,
  disliked: false,
  length: 'XL',
  password: '121296',
  demon: true,
  featured: true,
  epic: true,
  objects: 170739,
  uploaded: '4 years',
  updated: '6 months',
  stars_requested: 10,
  game_version: '2.1',
  ldm: false,
  copied: 25066306,
  two_p: false,
  coins: 0,
  verified_coins: false,
  song: {
    name: 'At the Speed of Light',
    id: 467339,
    artist: 'Dimrain47',
    artistId: 52,
    fileSize: '9.56 MB',
    link: 'https://geometrydashcontent.b-cdn.net/songs/467339.mp3'
  },
  pointercrate: { 
    position: 49,
    publisher: 'knobbelboy',
    verifier: 'knobbelboy'
  }
}
```
### getProfile(user)

With this function, you can get somebody's profile info. You can use a player ID (not the account ID) or a name string, it doesn't matter.

```js
const gd = require("gj-boomlings-api");
gd.getProfile(16).then(console.log); // returns RobTop's info
```

Returns:

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
### uploadComment(comment, id, user, password, percent)

You can post comments with this function.

For example,
```js
const gd = require("gj-boomlings-api");
gd.uploadComment("I love gj-boomlings-api!", 83925274, "gmdshxdow", "*********", 99).then(console.log);
// of course you need to replace the asterisks with your password
```

Posts a comment on the level with the ID of 83925274, with 99 percent, on gmdshxdow's behalf.
### getMapPacks(page)

This function gets the info about the map packs on a specified page (if left out, defaults to 1).

```js
const gd = require("gj-boomlings-api");
gd.getMapPacks(7).then(console.log);
```

Returns:

```
[
  {
    name: 'Demon Pack 13',
    id: 49,
    levels: [ 764038, 897837, 848722 ],
    stars: 10,
    coins: 2,
    difficulty: 'Hard Demon',
    textColor: '#00FF00',
    barColor: '#00FF00'
  },
  {
    name: 'Demon Pack 14',
    id: 50,
    levels: [ 840397, 413504, 839175 ],
    stars: 10,
    coins: 2,
    difficulty: 'Hard Demon',
    textColor: '#00FFFF',
    barColor: '#00FFFF'
  },
  {
    name: 'Demon Pack 15',
    id: 64,
    levels: [ 1018758, 1326086, 1698428 ],
    stars: 10,
    coins: 2,
    difficulty: 'Hard Demon',
    textColor: '#FF0000',
    barColor: '#FF0000'
  },
  {
    name: 'Demon Pack 16',
    id: 65,
    levels: [ 1668421, 1703546, 923264 ],
    stars: 10,
    coins: 2,
    difficulty: 'Hard Demon',
    textColor: '#FFFF00',
    barColor: '#FFFF00'
  },
  {
    name: 'Demon Pack 17',
    id: 66,
    levels: [ 1650666, 1474319, 1777565 ],
    stars: 10,
    coins: 2,
    difficulty: 'Hard Demon',
    textColor: '#96FF96',
    barColor: '#96FF96'
  }
]
```

**Check out [docs](./docs/) for more info.**

---

Inspired by [GDBrowser](https://github.com/GDColon/GDBrowser/). Thanks to [Wireshark](https://www.wireshark.org/) and [GD Docs](https://github.com/gd-programming/gd.docs/) for helping me in creating this package.