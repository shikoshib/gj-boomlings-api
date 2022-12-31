# updateLevelDesc()

Updates the description of a level.

## Parameters
`level` - the level ID.

`description` - the new description of a level.

`user` - the username or player ID.

`gjp` - the user's password.

## Example
```js
const gd = require("gj-boomlings-api");
gd.updateLevelDesc("83430836", "I love gj-boomlings-api!", "gmdshxdow", "*********").then(console.log);
```

## Response
```js
1
```