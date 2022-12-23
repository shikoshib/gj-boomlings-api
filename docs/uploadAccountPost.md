# uploadAccountPost()

Posts a comment to a profile.

## Parameters
`content` - the actual comment content.

`user` - the username or player ID.

`gjp` - the user's password.

## Example
```js
const gd = require("gj-boomlings-api");
gd.uploadAccountPost("i'm a furry", "colon", "*********").then(console.log);
// basically this function posts the "i'm a furry" message to Colon's profile
```

## Response
```js
1
```
Returns `1` if the comment was successfully posted.

---

Fun fact: you can actually post comments with non-Latin characters (Cyrillic letters, Arabic letters, etc.), but I don't recommend you to use them, cuz they are often really buggy.