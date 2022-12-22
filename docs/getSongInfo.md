# getSongInfo()

Gets a song on Newgrounds by its ID and returns info about it.

## Parameters
`song` - the song ID.

## Example
```js
const gd = require("gj-boomlings-api");
gd.getSongInfo(1099128).then(console.log);
```

## Response
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

Returns a [song object](./objects/song.md).