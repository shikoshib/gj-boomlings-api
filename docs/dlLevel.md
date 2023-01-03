# dlLevel()

Downloads a level and decodes it.

## Parameters
`level` - the level ID.

## Example
```js
const gd = require("gj-boomlings-api");
gd.dlLevel(58825144).then(console.log);
```

## Response
```
{
  id: 58825144,
  name: 'xo',
  description: 'stream vertigo',
  creator: 'KrmaL',
  level_version: 2,
  difficulty: 'Extreme Demon',
  stars: 10,
  downloads: 2640560,
  likes: 107918,
  disliked: false,
  length: 'XL',
  password: '000007',
  demon: true,
  featured: false,
  epic: false,
  objects: 37838,
  uploaded: '3 years',
  updated: '3 years',
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
Returns a [level object](./objects/level.md).