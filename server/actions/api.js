/* eslint-disable no-unused-vars */
const models = require('../models');
const md5 = require('blueimp-md5');
const { TOKEN_PRIVATE_KEY } = require('../token');

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
    const token = tokens[0];
    res.send(token);
  });
}

function generateToken(req, res) {
  const userId = req.user.sub;

  if (!userId) {
    const message = 'Invalid user';
    console.warn(message);
    res.send({
      status: -1,
      message,
    });
  }

  const ts = +new Date();
  const token = md5(`${TOKEN_PRIVATE_KEY}${userId}${ts}`);

  models.Tokens.create({
    token,
    userId,
    status: 0,
  })
    .then((w) => {
      res.send({
        status: w.status,
        id: w.id,
        token: w.token,
        userId: w.userId,
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
function checkToken(userToken, callback, error) {
  models.Tokens.findAll({
    where: {
      token: userToken,
      status: 0,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
    limit: 1,
  }).then((tokens) => {
    if (tokens) {
      const token = tokens[0];
      const userId = token.userId;
      callback(userId);
    } else {
      error();
    }
  });
}

function createWord(req, res) {
  const newWord = req.body.word;
  const listId = req.body.listId || 1;
  const userToken = req.body.token;

  if (!newWord) {
    const message = 'Invalid word entry';
    console.warn(message);
    res.send({
      status: 1,
      message,
    });
  }

  checkToken(
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
  );
}

module.exports = {
  getToken,
  generateToken,
  deleteToken,
  createWord,
  getWords,
};
