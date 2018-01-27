const models = require('../models');
/* eslint-disable no-unused-vars */
function get(req, res) {
  const page = req.query.page || 1;
  const listId = req.query.listId || 1;
  const userId = req.user.sub;

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
}

function create(req, res) {
  const newWord = req.body.word;
  const listId = req.body.listId || 1;
  const userId = req.user.sub;

  if (!newWord) {
    const message = 'Invalid word entry';
    console.warn(message);
    res.send({
      status: -1,
      message,
    });
  }

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
        status: -1,
        message,
      });
    });
}

function move(req, res) {
  const wordId = req.body.wordId;
  const listId = req.body.listId || 1;
  const userId = req.user.sub;

  models.Words.update({
    listId,
  }, {
    where: {
      id: wordId,
      userId,
      status: 0,
    },
  }).then((w) => {
    res.send({
      status: w.status,
      id: w.id,
      text: w.text,
      listId: w.listId,
      userId: w.userId,
    });
  })
    .catch((error) => {
      const message = 'Failed to move word';
      console.error(message);
      res.send({
        status: -1,
        message,
      });
    });
}

function update(req, res) {
  const wordId = req.body.wordId;
  const wordText = req.body.wordText;
  const userId = req.user.sub;

  models.Words.update({
    text: wordText,
  }, {
    where: {
      id: wordId,
      userId,
      status: 0,
    },
  }).then((w) => {
    res.send({
      status: w.status,
      id: w.id,
      text: w.text,
      listId: w.listId,
      userId: w.userId,
    });
  })
    .catch((error) => {
      const message = 'Failed to move word';
      console.error(message);
      res.send({
        status: -1,
        message,
      });
    });
}

module.exports = {
  create,
  get,
  move,
  update,
};
