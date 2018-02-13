const models = require('../models');
const { TOKEN_PRIVATE_KEY } = require('../token');
const md5 = require('blueimp-md5');

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
    const token = tokens[0]
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

  const ts = + new Date();
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
function createWord(req, res) {
}

module.exports = {
  getToken,
  generateToken,
  deleteToken,
  createWord,
};
