# [Word Kanban](https://word-kanban.herokuapp.com/)

[![](https://api.travis-ci.org/crispgm/word-kanban.svg?branch=master)](https://travis-ci.org/crispgm/word-kanban)

A simple Kanban-like word book, which is entirely written with Node. The user system is powered by Auth0. All the icons are actually emojis.

And we use Preact stacks for client side.

For demo use, please visit here <https://word-kanban.herokuapp.com/>.

## Development

1. Clone & Init

	```
	$ git clone https://github.com/crispgm/word-kanban.git
	$ yarn install
	```

2. Migrate

	```
	$ node_modules/.bin/sequelize db:migrate
	```

3. Run

	```
	$ GOOGLE_TRANSLATE_API_KEY=your-api-key yarn start
	```

## Deploy with Heroku

Coming soon.

## License

MIT License.

Copyright (c) 2018 David Zhang.
