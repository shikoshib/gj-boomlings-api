# gj-boomlings-api

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
  downloads: 18396549,
  likes: 682303,
  disliked: false,
  length: 'XL',
  password: '121296',
  demon: true,
  featured: true,
  epic: true,
  objects: 65535,
  uploaded: '4 years',
  updated: '5 months',
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
  }
}
```

### getSongInfo(song)

With this function, you can get an info about a custom song by its ID (unless it's on Newgrounds).

```js
const gd = require("gj-boomlings-api");
gd.getSongInfo(1099128).then(console.log);
```

Returns:

```
{
  name: 'Dynamics',
  id: 1099128,
  artist: 'shikoshib',
  artistId: 10001037,
  fileSize: '5.74 MB',
  link: 'https://audio.ngfiles.com/1099000/1099128_Dynamics.mp3?f1640426773'
}
```

### getOfficialSongInfo(song)

Basically the same thing as ```getSongInfo()```, but for official songs.

```js
const gd = require("gj-boomlings-api");
const song = gd.getOfficialSongInfo(14);
console.log(song);
```

Returns:

```
{
  name: 'Clubstep',
  id: 'Level 14',
  artist: 'DJ-Nate',
  fileSize: '0 MB',
  link: 'https://www.newgrounds.com/audio/listen/396093'
}
```

Inspired by [GDBrowser](https://github.com/GDColon/GDBrowser/). Thanks to [Wireshark](https://www.wireshark.org/) and [GDDocs](https://github.com/gd-programming/gd.docs/) for helping me in creating this package.