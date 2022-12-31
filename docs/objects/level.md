# Level object

Used by ```dlLevel()```.

## Example
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

## Properties
```id``` - the level ID.

```name``` - the level name.

```description``` - the level description.

```creator``` - the level creator.

```level_version``` - the version of a level.

```difficulty``` - the level difficulty.

```stars``` - the amount of stars you get from beating the level.

```downloads``` - the amount of level downloads.

```likes``` - the amount of level likes.

```disliked``` - a boolean that shows if the level is disliked. Returns ```true``` if the like amount is negative, otherwise it's ```false```.

```length``` - the level length.

```password``` - the level password. It may return ```'Non-copyable'``` if the level is not copyable, or ```'1'``` if the level is free to copy.

```demon``` - a boolean that shows if the level is demon.

```featured``` - a boolean that shows if the level has been featured.

```epic``` - a boolean that shows if the level is epic-rated.

```objects``` - the amount of level objects. However, this property has a cap of 65535 objects (it's RobTop's problem).

```uploaded``` - when the level has been uploaded.

```updated``` - when the level has been last updated.

```stars_requested``` - basically how many stars the creator has requested. Returns ```0``` if no stars have been requested.

```game_version``` - the version required to play the level. Returns `Pre-1.7` if the level has been uploaded or last updated earlier, than 1.7 came out.

```ldm``` - a boolean that shows if the level has a "Low Detail Mode" checkbox.

```copied``` - the original level ID, that got copied. Returns ```0``` if the level is already original.

```two_p``` - a boolean that shows if the level is in the 2-player mode.

```coins``` - the amount of coins in the level.

```verified_coins``` - a boolean that shows if the coins are verified (silver coins).

```song``` - a [song object](./song.md).