const fetch = require('node-fetch');
const { GOOGLE_TRANSLATE_API_KEY } = require('../token');

function translate(req, res) {
  const word = req.query.word;

  const input = {
    q: word,
    source: 'en',
    target: 'zh',
    format: 'text',
  };
  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
  fetch(url, { method: 'POST', body: JSON.stringify(input) }).then(response => response.json()).then((json) => {
    res.send(json);
  });
}

module.exports = {
  translate,
};
