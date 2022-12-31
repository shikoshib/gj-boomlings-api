# getUserLevels()

Gets the list of levels made by a specified user.

## Parameters
`user` - the user's username or a player ID.

`page` (optional) - the page. Defaults to 1.

## Example
```js
const gd = require("gj-boomlings-api");
gd.getUserLevels("shikoshib", 2).then(console.log);
```

## Response
```
[
  {
    id: 79650761,
    name: 'Lost or Not',
    description: "I'm going to make a level trilogy with my own song. Part 2 soon!",
    creator: 'shikoshib',
    level_version: 1,
    difficulty: 'Harder',
    stars: 0,
    downloads: 139,
    likes: 13,
    disliked: false,
    length: 'Long',
    demon: false,
    featured: false,
    epic: false,
    objects: 12020,
    stars_requested: 6,
    game_version: '2.1',
    copied: 0,
    two_p: false,
    coins: 3,
    verified_coins: false,
    song: {
      name: 'Not Lost',
      id: 1107430,
      artist: 'shikoshib',
      artistId: 10001037,
      fileSize: '8.5 MB',
      link: 'https://audio.ngfiles.com/1107000/1107430_Not-Lost.mp3?f1643365615'
    }
  },
  {
    id: 76643578,
    name: 'Ok Just Get It',
    description: 'pass 2305',
    creator: 'shikoshib',
    level_version: 1,
    difficulty: 'Harder',
    stars: 0,
    downloads: 96,
    likes: 13,
    disliked: false,
    length: 'Long',
    demon: false,
    featured: false,
    epic: false,
    objects: 4568,
    stars_requested: 2,
    game_version: '2.1',
    copied: 0,
    two_p: false,
    coins: 0,
    verified_coins: false,
    song: {
      name: 'F-777 - Medusa',
      id: 798747,
      artist: 'F-777',
      artistId: 286,
      fileSize: '7.39 MB',
      link: 'https://audio.ngfiles.com/798000/798747_F-777---Medusa.mp3?f1522612006'
    }
  }
]
```

Returns an array of [level objects](./objects/level.md).