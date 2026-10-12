# Word Kanban

A simple Kanban-like word book, which is entirely written with Node. The user system is powered by Auth0. All the icons are actually emojis.

And we use Preact stacks for client side.

## Development

Requires Node.js 24 or later. On macOS, the app uses a local SQLite database by
default; PostgreSQL is used on Linux and in production.

Clone & Init

```shell
$ git clone https://github.com/crispgm/word-kanban.git
$ npm ci
```

macOS stores development and test databases in `server/data/`; those files are
local-only and ignored by Git. To use PostgreSQL on macOS instead, set
`DB_DIALECT=postgres` and provide the usual `DB_USERNAME`, `DB_PASSWORD`,
`DB_NAME`, and `DB_HOSTNAME` values. `SQLITE_STORAGE` can override the local
SQLite file path.

Migrate

```shell
$ npm run db:migrate
```

Run the test suite with `npm test`. It migrates the test database automatically.

Build

```shell
$ npm run dev-build
```

Run

```shell
$ GOOGLE_TRANSLATE_API_KEY=your-google-api-key npm start
```

Note: You may run without a `GOOGLE_TRANSLATE_API_KEY`. However, the hover translation will definitely not work.

For production, provide a PostgreSQL `DATABASE_URL` and `GOOGLE_TRANSLATE_API_KEY`, build the client, then run:

```shell
$ NODE_ENV=production npm start
```

## License

MIT License.

Copyright (c) 2020 David Zhang.
