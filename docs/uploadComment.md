# uploadComment()

Posts a comment to a profile.

## Parameters
 
`content` - the actual comment content.

`id` - the level ID.

`user` - the username or player ID.

`gjp` - the user's password

`percent` (optional) - the comment percentage. Defaults to 0.

## Example
```js
const gd = require("gj-boomlings-api");
gd.uploadComment("I love gj-boomlings-api!", 83925274, "gmdshxdow", "*********", 99).then(console.log);
```

## Response
```js
1
```

Returns `1` if the comment was successfully posted.