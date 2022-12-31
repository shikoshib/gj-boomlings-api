# searchLevels()

Searches the levels by a specified query.

## Parameters
`query` - the search string, for example, the level name. If you'll leave it empty, you'll just get the list of most liked levels.

`page` (optional) - the page. Defaults to 1.

## Example
```js
const gd = require("gj-boomlings-api");
gd.searchLevels("", 2).then(console.log);
```

## Response
```
[
  {
    id: 27319926,
    name: 'through time',
    description: 'Run... run through time. For you all! Follow me on twitter: @ItsBerkoo',
    creator: 'Berkoo',
    level_version: 2,
    difficulty: 'Normal',
    stars: 3,
    downloads: 28632458,
    likes: 2503368,
    disliked: false,
    length: 'Long',
    demon: false,
    featured: true,
    epic: false,
    objects: 0,
    stars_requested: 2,
    game_version: '2.0',
    copied: 0,
    two_p: false,
    coins: 1,
    verified_coins: true,
    song: {
      name: 'Promises',
      id: 678497,
      artist: 'KabukiTunes',
      artistId: 47258,
      fileSize: '8.23 MB',
      link: 'http://audio.ngfiles.com/678000/678497_Promises.mp3'
    }
  },
  {
    id: 28179535,
    name: 'Acid Factory',
    description: 'Geometry dash - Poison Gauntlet - Thanks for play! [Acid Factory] 11,000,000 Downloads! <3 ',
    creator: 'TrinckyFinki',
    level_version: 3,
    difficulty: 'Hard',
    stars: 4,
    downloads: 51023385,
    likes: 2446217,
    disliked: false,
    length: 'Long',
    demon: false,
    featured: true,
    epic: false,
    objects: 14193,
    stars_requested: 3,
    game_version: '2.1',
    copied: 28178503,
    two_p: false,
    coins: 3,
    verified_coins: true,
    song: {
      name: 'VGMusicRox - Frantic Factory (',
      id: 550260,
      artist: 'Viproxi',
      artistId: 4107,
      fileSize: '5.94 MB',
      link: 'http://audio.ngfiles.com/550000/550260_VGMusicRox---Frantic-Facto.mp3'
    }
  },
  {
    id: 55520,
    name: 'THE LIGHTNING ROAD',
    description: 'Removed Coins, ~ Timeless Real / Reduloc',
    creator: 'timeless real',
    level_version: 3,
    difficulty: 'Easy Demon',
    stars: 10,
    downloads: 44657564,
    likes: 2440721,
    disliked: false,
    length: 'Long',
    demon: true,
    featured: true,
    epic: false,
    objects: 3527,
    stars_requested: 10,
    game_version: '2.1',
    copied: 55520,
    two_p: false,
    coins: 0,
    verified_coins: false,
    song: {
      name: 'Dry Out',
      id: 'Level 4',
      artist: 'DJVI',
      link: 'https://www.youtube.com/watch?v=FnXabH2q2A0'
    }
  },
...and so on
```

Returns an array of [level objects](./objects/level.md), sorted by the amount of likes.