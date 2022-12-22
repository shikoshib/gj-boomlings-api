# Comment object

Used by `getComments()` and `getCommentHistory()`.

## Example
```
{
    username: 'RobTop',
    content: ':)',
    levelID: 10565740,
    playerID: 16,
    likes: 57919,
    percent: 0,
    id: 53363972,
    age: '5 years'
}
```

## Properties
```username``` - the comment author's username.

```content``` - the actual content of a comment.

```levelID``` - the ID of a level, on which the comment was sent.

```playerID``` - the comment author's player ID.

```likes``` - the amount of likes on a comment.

```percent``` - the percentage that has been put on this comment. Returns `0` if the percentage checkbox hadn't been checked.

```id``` - the ID of a comment.

```age``` - the age of a comment.
