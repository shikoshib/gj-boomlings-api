# Level object

Used by ```getProfile()```.

## Example
```
{
  username: 'RobTop',
  playerID: 16,
  accountID: 71,
  rank: 219796,
  stars: 2375,
  diamonds: 2170,
  secretCoins: 3,
  userCoins: 140,
  demons: 5,
  creatorPoints: 0,
  messages: 'none',
  friendRequests: 'none',
  commentHistory: 'all',
  mod: 'elder',
  youtube: 'https://youtube.com/channel/UCz_yk8mDSAnxJq0ar66L4sw',
  twitter: 'https://twitter.com/RobTopGames',
  twitch: 'https://twitch.tv/robtopgames'
}
```

## Properties
```username``` - the player's username.

```playerID``` - the player ID.

```accountID``` - the account ID.

```rank``` - the user's position in the global leaderboard. Returns `0` if the player hasn't received it yet or if the player is banned on the leaderboard.

```stars``` - the amount of stars the player has.

```diamonds``` - the amount of diamonds the player has.

```secretCoins``` - the amount of secret (gold) coins the player has collected.

```userCoins``` - the amount of user (white) coins the player has collected.

```demons``` - the amount of demons the player has beaten.

```creatorPoints``` - the amount of creator points the player has.

```messages``` - a property that shows if you can send messages to the player. Returns `"none"` if the DMs are closed, `"friends"` if sending DMs is available to only friends, and `"all"` if everyone can send messages to the specified player.

```friendRequests``` - a property that shows if you can send friend requests to the player. Returns `"none"` if you can't or `"all"` if everyone can send friend requests to the specified player.

```commentHistory``` - a property that shows if you can view the player's comment history. Returns `"none"` if you can't, `"friends"` if viewing the comment history is available to only friends, and `"all"` if everyone can view the comment history.

```mod``` - a property that shows if the player is an in-game moderator. Returns `"none"` if not, `"mod"` if the player is a regular Mod (yellow badge), and `"elder"` if the player is an Elder Mod (orange badge).

```youtube``` - the link to the player's YouTube channel.

```twitter``` - the link to the player's Twitter account.

```twitch``` - the link to the player's Twitch channel.