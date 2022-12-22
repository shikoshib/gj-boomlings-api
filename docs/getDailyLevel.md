# getDailyLevel()

Downloads a daily level and decodes it.

## Parameters
No parameters!

## Example
```js
const gd = require("gj-boomlings-api");
gd.getDailyLevel().then(console.log);
```

## Response
Returns a [level object](./objects/level.md). 

Basically it's same thing as `dlLevel()`, but for daily levels.