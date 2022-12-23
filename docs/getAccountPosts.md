# getAccountPosts()

Gets the account comments from someone's profile.

## Parameters
`user` - the username or player ID.

`page` (optional) - the page of the posts. Defaults to 1.

## Example
```js
const gd = require("gj-boomlings-api");
gd.getAccountPosts("robtop").then(console.log);
```

## Response
```js
[
  {
    content: "Thank you everyone for the birthday wishes. You're the best! :)",
    likes: 97911,
    age: '10 months'
  },
  {
    content: 'Happy New Year everyone! :D',
    likes: 60720,
    age: '11 months'
  },
  {
    content: 'Thank you all for the birthday wishes :)',
    likes: 144296,
    age: '1 year'
  },
  {
    content: 'Happy New Year everyone!... Still should post more often xD',
    likes: 86611,
    age: '1 year'
  },
  {
    content: 'Happy New Year everyone!... I should really post more often than this xD',
    likes: 133553,
    age: '2 years'
  },
  {
    content: 'Happy New Year everyone! :D',
    likes: 272323,
    age: '3 years'
  },
  {
    content: 'Its amazing how talented level creators are these days :)',
    likes: 259426,
    age: '5 years'
  },
  { 
    content: 'El pollo ardiente...',
    likes: 240085, 
    age: '5 years' 
  },
  { 
    content: 'I am eating an apple.', 
    likes: 222661, 
    age: '5 years'
  },
  {
    content: 'RubRubRubRubRubRubRubRubRubRubRubRubRubRubRubRubRubRub',
    likes: 241988,
    age: '5 years'
  }
]
```
Returns an array of [account comments](./objects/acc_comment.md).