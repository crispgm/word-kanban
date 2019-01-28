const models = require('../models');
const moment = require('moment');
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
      const message = 'Failed to update word';
      console.error(message);
      res.send({
        status: -1,
        message,
      });
    });
}

function remove(req, res) {
  const wordId = req.body.wordId;
  const userId = req.user.sub;

  models.Words.update({
    status: 1,
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
      const message = 'Failed to remove word';
      console.error(message);
      res.send({
        status: -1,
        message,
      });
    });
}

function userRecord(req, res) {
  const userId = req.user.sub;

  models.sequelize.query(
    `SELECT date_trunc('day', "Words"."createdAt") as "day", count("Words"."id") AS "words_cnt"
     FROM "Words" WHERE "Words"."userId"='${userId}'
     GROUP BY date_trunc('day', "Words"."createdAt")
     ORDER BY day DESC LIMIT 30`,
    { raw: true },
  ).then((result) => {
    const rows = result[0];
    const dataCollected = {};
    const data = [];
    for (const row of rows) {
      dataCollected[moment(row.day).unix()] = row.words_cnt;
    }
    /* eslint-disable no-plusplus */
    for (let i = 0; i < 30; i++) {
      const today = moment({ hour: 0 });
      const curDay = today.subtract(30, 'days').add(i, 'days').unix();
      if (dataCollected[curDay]) {
        data.push({ day: curDay, count: dataCollected[curDay] });
      } else {
        data.push({ day: curDay, count: 0 });
      }
    }
    res.send({
      status: 0,
      data,
    });
  });
}

function exportData(req, res) {
  const userId = req.user.sub;

  models.Words.findAll({
    where: {
      listId: [1, 2],
      userId,
      status: 0,
    },
    order: [
      ['id', 'DESC'],
    ],
    group: ['listId', 'id'],
  }).then((words) => {
    const inbox = [];
    const history = [];
    for (const item of words) {
      if (item.listId === 1) {
        inbox.push(item);
      } else if (item.listId === 2) {
        history.push(item);
      }
    }
    res.set({
      'Content-Disposition': `attachment; filename=word-kanban-${userId}.json`,
    });
    res.send({
      words: {
        inbox,
        history,
      },
    });
  });
}

module.exports = {
  create,
  get,
  move,
  update,
  remove,
  userRecord,
  exportData,
};
