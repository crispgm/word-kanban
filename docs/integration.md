# Integration

Word Kanban provides a simple API for integrations.

## API

The WK API is a simple API for creating new word and fetching a list, which is designed for integration use. It is not a full-fledged API, which means you may not be able to build a WK client using API.

One of the scenario is making a [Workflow](https://workflow.is/), by which we may send selected word to WK as a new word.

### Token

* Generate: click the generate button to get a new token, which is permanent. NOTE: There is an one-day cooldown.
* Remove: click the remove button to remove the token, but you may generate a new one later.

### Endpoints

#### Create a new word

```
POST https://word-kanban.herokuapp.com/api/v1/word
```

| Name | Type | Description |
|----|----|----|
| word | String | **Required**. New word to add. |

#### Get a list of word

```
GET https://word-kanban.herokuapp.com/api/v1/words
```

| Name | Type | Description |
|----|----|----|
| listId | Integer | **Optional**. List ID, 1 for inbox, 2 for history. Default 1. |
| page | Integer | **Optional**. Page, default 1. |
