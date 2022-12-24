# getGauntlets()

Gets the list of gauntlets and decodes it.

## Parameters
No parameters!

## Example
```js
const gd = require("gj-boomlings-api");
gd.getGauntlets().then(console.log);
```

## Response
```
[
  {
    name: 'Fire Gauntlet',
    levels: [ '27732941', '28200611', '27483789', '28225110', '27448202' ]
  },
  {
    name: 'Ice Gauntlet',
    levels: [ '20635816', '28151870', '25969464', '24302376', '27399722' ]
  },
  {
    name: 'Poison Gauntlet',
    levels: [ '28179535', '29094196', '29071134', '26317634', '12107595' ]
  },
  {
    name: 'Shadow Gauntlet',
    levels: [ '26949498', '26095850', '27973097', '27694897', '26070995' ]
  },
  {
    name: 'Lava Gauntlet',
    levels: [ '18533341', '28794068', '28127292', '4243988', '28677296' ]
  },
  {
    name: 'Bonus Gauntlet',
    levels: [ '28255647', '27929950', '16437345', '28270854', '29394058' ]
  },
  {
    name: 'Chaos Gauntlet',
    levels: [ '25886024', '4259126', '26897899', '7485599', '19862531' ]
  },
  {
    name: 'Demon Gauntlet',
    levels: [ '18025697', '23189196', '27786218', '27728679', '25706351' ]
  },
  {
    name: 'Time Gauntlet',
    levels: [ '40638411', '32614529', '31037168', '40937291', '35165900' ]
  },
  {
    name: 'Crystal Gauntlet',
    levels: [ '37188385', '35280911', '37187779', '36301959', '36792656' ]
  },
  {
    name: 'Magic Gauntlet',
    levels: [ '37269362', '29416734', '36997718', '39853981', '39853458' ]
  },
  {
  {
    name: 'Monster Gauntlet',
    levels: [ '43908596', '41736289', '42843431', '44063088', '44131636' ]
  },
  {
    name: 'Doom Gauntlet',
    levels: [ '38427291', '38514054', '36966088', '38398923', '36745142' ]
  },
  {
    name: 'Death Gauntlet',
    levels: [ '44121158', '43923301', '43537990', '33244195', '35418014' ]
  }
]
```
This function returns an array of gauntlet objects.

### Properties
`name` - the gauntlet name.

`levels` - the array of levels in a gauntlet.