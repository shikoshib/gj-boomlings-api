# getCommentHistory()

Gets a comment history from a specified player.

## Parameters
`user` - the player's username or a player ID.

`page` (optional) - the page of the comment history. Defaults to 1.

`mode` (optional) - the mode of fetching the comment history. `1` is the most liked and `0` is the most recent. Defaults to 1.

## Example
```js
const gd = require("gj-boomlings-api");
gd.getCommentHistory("robtop").then(console.log);
```

## Response
```
[
  {
    username: 'RobTop',
    content: 'Like or dislike this comment, it will add 10 likes either way. Check. Mate.',
    levelID: 66715392,
    playerID: 16,
    likes: 733980,
    percent: 0,
    id: 11005139,
    age: '1 year'
  },
  {
    username: 'RobTop',
    content: 'Can you handle the Kappa?',
    levelID: 7485599,
    playerID: 16,
    likes: 115556,
    percent: 0,
    id: 42602304,
    age: '5 years'
  },
  {
    username: 'RobTop',
    content: 'All demons default to hard when first rated, they get the real rating from votes later :)',
    levelID: 42584142,
    playerID: 16,
    likes: 72069,
    percent: 0,
    id: 12967791,
    age: '4 years'
  },
  {
    username: 'RobTop',
    content: ':)',
    levelID: 10565740,
    playerID: 16,
    likes: 57919,
    percent: 0,
    id: 53363972,
    age: '5 years'
  },
  {
    username: 'RobTop',
    content: 'Love it :)',
    levelID: 29424929,
    playerID: 16,
    likes: 55456,
    percent: 0,
    id: 42731804,
    age: '5 years'
  },
  {
    username: 'RobTop',
    content: 'Good enough for me Kappa',
    levelID: 26681070,
    playerID: 16,
    likes: 51795,
    percent: 1,
    id: 53375227,
    age: '5 years'
  },
  {
    username: 'RobTop',
    content: 'Getting 7 stars doesnt exclude it from the gauntlet competition dont worry :)',
    levelID: 43908596,
    playerID: 16,
    likes: 43546,
    percent: 0,
    id: 15614671,
    age: '4 years'
  },
  {
    username: 'RobTop',
    content: 'I like this level, you guys prefer newer ones? Almost felt like putting Nine Circles :D',
    levelID: 17235008,
    playerID: 16,
    likes: 38313,
    percent: 0,
    id: 61915039,
    age: '4 years'
  },
  {
    username: 'RobTop',
    content: 'Kappa',
    levelID: 19759411,
    playerID: 16,
    likes: 37952,
    percent: 0,
    id: 22802511,
    age: '6 years'
  },
  {
    username: 'RobTop',
    content: 'You know you are getting old when you can only get 2% on an easy demon',
    levelID: 27690100,
    playerID: 16,
    likes: 37144,
    percent: 2,
    id: 87255259,
    age: '1 year'
  }
]
```
Returns an array of [comment objects](./objects/comment.md).