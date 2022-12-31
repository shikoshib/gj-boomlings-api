# getLevelByID()

Gets the basic info about the level by its ID.

## Parameters
`level` - the level ID.

## Example
```js
const gd = require("gj-boomlings-api");
gd.getLevelByID(11940).then(console.log);
```

## Response
```
{
  id: 11940,
  name: 'Level Easy',
  description: 'Cody',
  creator: '-',
  level_version: 1,
  difficulty: 'Normal',
  stars: 3,
  downloads: 66447749,
  likes: 3781481,
  disliked: false,
  length: 'Long',
  demon: false,
  featured: true,
  epic: false,
  objects: 0,
  stars_requested: 0,
  game_version: 'Pre-1.7',
  copied: 0,
  two_p: false,
  coins: 0,
  verified_coins: false,
  song: {
    name: 'Stereo Madness',
    id: 'Level 1',
    artist: 'ForeverBound',
    link: 'https://www.youtube.com/watch?v=JhKyKEDxo8Q'
  }
}
```

Returns a [level object](./objects/level.md).

---

**NOTE:** This is pretty much the same thing as `dlLevel()`, but `getLevelByID()` doesn't provide the password, update and upload date and the LDM checkbox. On the other hand, it's much faster (especially for object-heavy levels).