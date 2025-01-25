<div align="center">
  <h1>gj-boomlings-api</h1>
  A light-weight Geometry Dash API wrapper<br><br><a href="https://github.com/shikoshib/gj-boomlings-api/wiki"><b>Documentation</b></a><br><br>
  <a href="https://www.npmjs.com/package/gj-boomlings-api"><img src="https://img.shields.io/npm/v/gj-boomlings-api.svg?maxAge=3600" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/gj-boomlings-api"><img src="https://img.shields.io/npm/dt/gj-boomlings-api" /></a>
  <a href="https://snyk.io/test/github/shikoshib/gj-boomlings-api"><img src="https://snyk.io/test/github/shikoshib/gj-boomlings-api/badge.svg" alt="Known Vulnerabilities" /></a>
</div>

# About
**gj-boomlings-api** is a light-weight Node.js module that allows you to easily interact with Geometry Dash API.
# Installation
## Node.js
```
npm i gj-boomlings-api
yarn add gj-boomlings-api
```
# Examples
## Download a level
```js
const gd = require("gj-boomlings-api");
gd.dlLevel("95540029").then(console.log);
```
## View a profile
```js
const gd = require("gj-boomlings-api");
gd.getProfile("shikoshib").then(console.log);
```
## Get gauntlets
```js
const gd = require("gj-boomlings-api");
gd.getGauntlets().then(console.log);
```
## Post a message on a profile
```js
const gd = require("gj-boomlings-api");
gd.uploadAccountPost("I love gj-boomlings-api!", "shikoshib", "your password here");
```
## Send a message
```js
// This code sends a message from shikoshib to Mipper6
const gd = require("gj-boomlings-api");
gd.uploadMessage("Mipper6", "message subject", "message content", "shikoshib", "your password here");
```
# License
[ISC](https://github.com/shikoshib/gj-boomlings-api/blob/main/LICENSE)