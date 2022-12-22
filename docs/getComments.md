# getComments()

Gets a list of comments from a specified level.

## Parameters
`level` - the level whose comments we want to check.

`page` (optional) - the page of the comments. Defaults to 1.

`mode` (optional) - the mode of fetching the comments. `1` is the most liked and `0` is the most recent. Defaults to 1.

## Example
```js
const gd = require("gj-boomlings-api");
gd.getComments(42584142).then(console.log);
```

## Response
```
[
  {
    username: 'RobTop',
    content: 'All demons default to hard when first rated, they get the real rating from votes later :)',
    playerID: 16,
    likes: 72069,
    percent: 0,
    id: 12967791,
    age: '4 years'
  },
  {
    username: 'Knobbelboy',
    content: 'IT IS FINALLY OVER!!!!!!!!!!!!!! THIS IS IT!!! THANK YOU ALL!!!!',
    playerID: 4214375,
    likes: 71760,
    percent: 0,
    id: 12958654,
    age: '4 years'
  },
  {
    username: 'shaggy23',
    content: 'Zobros: Easy Insane 9',
    playerID: 1995959,
    likes: 31953,
    percent: 0,
    id: 12968377,
    age: '4 years'
  },
  {
    username: 'IInfinityy',
    content: "pro tip : don't play bloodlust on phone",
    playerID: 15630652,
    likes: 30194,
    percent: 1,
    id: 12960792,
    age: '4 years'
  },
  {
    username: 'RobTop',
    content: '1% :O :O :O :O',
    playerID: 16,
    likes: 29497,
    percent: 0,
    id: 16183012,
    age: '4 years'
  },
  {
    username: 'AdvyStyles',
    content: 'ok',
    playerID: 2434963,
    likes: 16910,
    percent: 0,
    id: 13190982,
    age: '4 years'
  },
  {
    username: 'SerSerpent',
    content: 'Guess now Knobbelboy evolved to Knobbelman',
    playerID: 19203596,
    likes: 15362,
    percent: 0,
    id: 12962171,
    age: '4 years'
  },
  {
    username: 'GDWindex',
    content: 'Pass is 121296, now like this comment so others can see',
    playerID: 78434904,
    likes: 14567,
    percent: 0,
    id: 13250862,
    age: '4 years'
  },
  {
    username: 'Juniper',
    content: 'PRESS F TO RESPECT THE H*CK OUT OF KNOBBELBOY',
    playerID: 2614903,
    likes: 14115,
    percent: 0,
    id: 12970170,
    age: '4 years'
  },
  {
    username: 'lSunix',
    content: 'aoc',
    playerID: 14251090,
    likes: 6437,
    percent: 100,
    id: 14252314,
    age: '4 years'
  }
]
```
Returns an array of [comment objects](./objects/comment.md).
