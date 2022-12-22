# reportLevel()

Reports the level.

## Parameters
`level` - the level id.

## Example
```js
const gd = require("gj-boomlings-api");
gd.reportLevel(54953085).then(console.log);
```

## Response
```js
1
```

For some reason, the API always returns 1, even if you'll provide an invalid ID.