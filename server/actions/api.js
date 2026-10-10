/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const crypto = require('crypto');
const models = require('../models');

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// token mgmt
function getToken(req, res) {
  const userId = req.user.sub;

  models.Tokens.findAll({
    where: {
      userId,
      status: 0,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
    limit: 1,
  }).then((tokens) => {
    res.send({
      status: 0,
      active: Boolean(tokens[0]),
    });
  });
}

function generateToken(req, res) {
  const userId = req.user.sub;

  if (!userId) {
    const message = 'Invalid user';
    console.warn(message);
    return res.send({
      status: -1,
      message,
    });
  }

  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = hashToken(token);

  return models.sequelize.transaction(transaction => Promise.all([
    models.Tokens.update({ status: 1 }, {
      where: { userId, status: 0 },
      transaction,
    }),
    models.Tokens.create({
      token: tokenHash,
      userId,
      status: 0,
    }, { transaction }),
  ]))
    .then(([, w]) => {
      res.send({
        status: w.status,
        id: w.id,
        token,
      });
    })
    .catch((error) => {
      const message = 'Failed create token';
      console.error(message);
      res.send({
        status: -1,
        message,
      });
    });
}

function deleteToken(req, res) {
  const userId = req.user.sub;

  models.Tokens.update({
    status: 1,
  }, {
    where: {
      userId,
      status: 0,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
    limit: 1,
  }).then((w) => {
    res.send({
      status: 0,
      message: 'success',
    });
  })
    .catch((error) => {
      const message = 'Failed to delete token';
      console.error(message);
      res.send({
        status: -1,
        message,
      });
    });
}

// user apis
function checkToken(userToken, callback, onInvalidToken, onError) {
  if (!userToken) {
    onInvalidToken();
    return;
  }

  models.Tokens.findOne({
    where: {
      token: hashToken(userToken),
      status: 0,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
    limit: 1,
  }).then((token) => {
    if (!token) {
      onInvalidToken();
      return;
    }
    callback(token.userId);
  }).catch((error) => {
    console.error('Failed to verify token', error);
    onError();
  });
}

function createWord(req, res) {
  const newWord = req.body.word;
  const listId = req.body.listId || 1;
  const userToken = req.body.token;

  if (!newWord) {
    const message = 'Invalid word entry';
    console.warn(message);
    return res.status(400).send({
      status: 1,
      message,
    });
  }

  return checkToken(
    userToken,
    (userId) => {
      models.Words.create({
        text: newWord,
        listId,
        userId,
        status: 0,
      })
        .then((w) => {
          res.send({
            status: w.status,
            id: w.id,
            text: w.text,
            listId: w.listId,
            userId: w.userId,
          });
        })
        .catch((error) => {
          const message = 'Failed to save new word';
          console.error(message);
          res.send({
            status: 2,
            message,
          });
        });
    },
    () => {
      res.send({
        status: 3,
        message: 'Invalid token',
      });
    },
    () => {
      res.status(500).send({
        status: 2,
        message: 'Failed to verify token',
      });
    },
  );
}

function getWords(req, res) {
  const page = req.query.page || 1;
  const listId = req.query.listId || 1;
  const userToken = req.query.token;

  checkToken(
    userToken,
    (userId) => {
      models.Words.findAll({
        where: {
          listId,
          userId,
          status: 0,
        },
        offset: (page - 1) * 30,
        limit: 30,
        order: [
          ['id', 'DESC'],
        ],
      }).then((words) => {
        res.send({
          words,
        });
      });
    },
    () => {
      res.send({
        status: 3,
        message: 'Invalid token',
      });
    },
    () => {
      res.status(500).send({
        status: 2,
        message: 'Failed to verify token',
      });
    },
  );
}

module.exports = {
  getToken,
  generateToken,
  deleteToken,
  createWord,
  getWords,
  hashToken,
};
