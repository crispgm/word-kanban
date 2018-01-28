# [Word Kanban](https://word-kanban.herokuapp.com/)

[![](https://api.travis-ci.org/crispgm/word-kanban.svg?branch=master)](https://travis-ci.org/crispgm/word-kanban)

A simple Kanban-like word book, which is entirely written with Node. The user system is powered by Auth0. All the icons are actually emojis.

And we use Preact stacks for client side.

For demo use, please visit here <https://word-kanban.herokuapp.com/>.

## Development

Clone & Init

```
$ git clone https://github.com/crispgm/word-kanban.git
$ yarn install
```

Migrate

```
$ node_modules/.bin/sequelize db:migrate
```

Build

```
$ yarn dev-build
```

Run

```
$ GOOGLE_TRANSLATE_API_KEY=your-api-key yarn start
```

## Deploy with Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/crispgm/word-kanban)

Create app

```
$ heroku create your-app-name
$ heroku git:remote -a your-app-name
```

Set config vars

```
$ heroku config:set NPM_CONFIG_PRODUCTION=false
$ heroku config:set GOOGLE_TRANSLATE_API_KEY=your-api-key
```

Create DB

```
$ heroku addons:add heroku-postgresql:dev
$ heroku config:set DATABASE_URL=your-database-url
```

Migrate

```
$ heroku run bash
$ cd server
$ sequelize db:migrate
```

## License

MIT License.

Copyright (c) 2018 David Zhang.
