# getOfficialSongInfo()

Gets an info about an official song by its ID.

## Parameters
`song` - the official song ID.

## Example
```js
const gd = require("gj-boomlings-api");
const song = gd.getOfficialSongInfo(14);
console.log(song);
```

## Response
```
{
  name: 'Clubstep',
  id: 'Level 14',
  artist: 'DJ-Nate',
  link: 'https://www.newgrounds.com/audio/listen/396093'
}
```

Returns a [song object](./objects/song.md), except for the `artistId` and `fileSize` properties.