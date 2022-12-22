# getWeeklyDemon()

Downloads a weekly demon and decodes it.

## Parameters
No parameters!

## Example
```js
const gd = require("gj-boomlings-api");
gd.getWeeklyDemon().then(console.log);
```

## Response
Returns a [level object](./objects/level.md). 

Basically it's same thing as `dlLevel()`, but for weekly demons.