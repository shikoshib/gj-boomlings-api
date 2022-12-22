# gj-boomlings-api

This package gets info from RobTop's servers (boomlings.com) and converts it into pure and beautiful JSON.

## Functions

### dlLevel(id)

So basically this function downloads the entire level and converts the response into JSON.

```js
const gd = require("gj-boomlings-api");
gd.dlLevel(58825144).then(console.log); // returns "xo"
```

Returns:

```
{
  id: 58825144,
  name: 'xo',
  description: 'stream vertigo',
  creator: 'KrmaL',
  level_version: 2,
  difficulty: 'Extreme Demon',
  stars: 10,
  downloads: 2587512,
  likes: 106611,
  disliked: false,
  length: 'XL',
  password: '000007',
  demon: true,
  featured: false,
  epic: false,
  objects: 37838,
  uploaded: '2 years',
  updated: '2 years',
  stars_requested: 10,
  game_version: '2.1',
  ldm: false,
  copied: 0,
  two_p: false,
  coins: 0,
  verified_coins: false,
  song: {
    name: 'XO (Eden Cover & Remake)',
    id: 766165,
    artist: 'aaronmusslewhite',
    artistId: 2130,
    fileSize: '6.1 MB',
    link: 'http://audio.ngfiles.com/766000/766165_XO-Eden-Cover-amp-Remake.mp3'
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

Check out [docs](./docs/) for more info.

---

Inspired by [GDBrowser](https://github.com/GDColon/GDBrowser/). Thanks to [Wireshark](https://www.wireshark.org/) and [GDDocs](https://github.com/gd-programming/gd.docs/) for helping me in creating this package.