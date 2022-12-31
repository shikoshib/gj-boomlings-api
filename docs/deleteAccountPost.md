# deleteAccountPost()

Posts a comment to a profile.

## Parameters
`id` - the account post ID. Returned by `getAccountPosts()`.

`user` - the username or player ID.

`gjp` - the user's password.

## Example
```js
const gd = require("gj-boomlings-api");
gd.deleteAccountPost("18183557", "gmdshxdow", "*********").then(console.log);
```

## Response
```js
1
```

Returns `1` if the comment was successfully deleted.