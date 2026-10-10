# Word Kanban

A simple Kanban-like word book, which is entirely written with Node. The user system is powered by Auth0. All the icons are actually emojis.

And we use Preact stacks for client side.

## Development

Requires Node.js 22 or later and PostgreSQL.

Clone & Init

```shell
$ git clone https://github.com/crispgm/word-kanban.git
$ npm ci
```

Migrate

```shell
$ npm run db:migrate
```

Build

```shell
$ npm run dev-build
```

Run

```shell
$ GOOGLE_TRANSLATE_API_KEY=your-google-api-key npm start
```

Note: You may run without a `GOOGLE_TRANSLATE_API_KEY`. However, the hover translation will definitely not work.

For production, provide `DATABASE_URL`, `GOOGLE_TRANSLATE_API_KEY`, and `TOKEN_PRIVATE_KEY`, build the client, then run:

```shell
$ NODE_ENV=production npm start
```

## License

MIT License.

Copyright (c) 2020 David Zhang.
