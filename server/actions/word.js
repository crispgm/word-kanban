const models = require('../models');

function get(req, res) {
  const page = req.query.page || 1;
  const listId = req.query.listId || 1;
  const userId = 1;

  models.Words.findAll({
    where: {
      listId: listId,
      userId: userId,
      status: 0,
    },
    offset: (page - 1) * 30,
    limit: 30,
    order: [
      ['id', 'DESC'],
    ],
  }).then(function(words) {
    res.send({
      words: words,
    });
  });
}

function create(req, res) {
  const newWord = req.query.word;
  const listId = req.query.listId || 1;

  models.Words.create({
      text: newWord,
      listId: listId,
      userId: userId,
      status: 0,
    })
    .then(w => {
      res.send({
        status: 0,
        id: w.id,
        text: w.text,
        listId: w.listId,
        userId: w.userId,
      });
    })
    .catch(error => {
      const message = 'Failed to save new word';
      console.error(message);
      res.send({
        status: -1,
        message: message,
      });
    });
}

module.exports = {
  create,
  get,
};
