# getMapPacks()

Gets the list of map packs and decodes it.

## Parameters
`page` (optional) - the page of the map packs list. Defaults to 1.

## Example
```js
const gd = require("gj-boomlings-api");
gd.getMapPacks(2).then(console.log);
```

## Response
```
[
  {
    name: 'Ruby Pack',
    levels: [ 1446958, 1063115, 1734354 ],
    stars: 4,
    coins: 1
  },
  {
    name: 'Electro Pack',
    levels: [ 5131543, 8157377, 8571598 ],
    stars: 4,
    coins: 1
  },
  {
    name: 'Laser Pack',
    levels: [ 12178580, 11357573, 11591917 ],
    stars: 4,
    coins: 1
  },
  {
    name: 'Glow Pack',
    levels: [ 4449079, 6979485, 10110092 ],
    stars: 4,
    coins: 1
  },
  {
    name: 'Spirit Pack',
    levels: [ 13766381, 13242284, 13963465 ],
    stars: 4,
    coins: 1
  },
  {
    name: 'Hard Pack',
    levels: [ 217631, 3785, 281148 ],
    stars: 5,
    coins: 1
  },
  {
    name: 'Morph Pack',
    levels: [ 364445, 411459, 509393 ],
    stars: 5,
    coins: 1
  },
  {
    name: 'Phoenix Pack',
    levels: [ 674454, 750434, 835854 ],
    stars: 5,
    coins: 1
  },
  {
    name: 'Power Pack',
    levels: [ 809579, 741941, 577710 ],
    stars: 5,
    coins: 1
  },
  {
    name: 'Shiny Pack',
    levels: [ 980341, 1541962, 1160937 ],
    stars: 5,
    coins: 1
  }
]
```
This function returns an array of map pack objects.

### Properties
`name` - the map pack name.

`levels` - the array of levels in a map pack.

`stars` - the amount of stars you get from beating the map pack.

`coins` - the amount of coins you get from beating the map pack.