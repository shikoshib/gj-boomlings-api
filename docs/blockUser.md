# blockUser()

Blocks the user.

## Parameters
`target` - the user that is being blocked.

`user` - the player ID or the username of the user that blocks.

`gjp` - the password of the user that blocks.

## Example
```js
const gd = require("gj-boomlings-api");
gd.blockUser("colon", "gmdshxdow", "*********").then(console.log);
```

## Response
```js
1
```