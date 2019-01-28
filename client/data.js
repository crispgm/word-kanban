import fetch from 'unfetch';
import timeoutify from 'timeoutify-promise';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function startProgress() {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
}

function endProgress() {
  NProgress.done();
}

function getData(url, callback, timeout) {
  startProgress();
  timeoutify(fetch(url, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  }), 3000)
    .then((response) => {
      endProgress();
      return response.json();
    })
    .then((json) => { callback(json); })
    .catch(() => {
      endProgress();
      timeout();
    });
}

function postData(url, form, callback, timeout) {
  startProgress();
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(form),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  })
    .then((response) => {
      endProgress();
      return response.json();
    })
    .then((json) => { callback(json); })
    .catch(() => {
      endProgress();
      timeout();
    });
}

export function getWords(listId, page, callback, timeout) {
  getData(`/word/get?listId=${listId}&page=${page}`, callback, timeout);
}

export function createWord(word, listId, callback, timeout) {
  postData('/word/create', {
    word,
    listId,
  }, callback, timeout);
}

export function moveWord(wordId, listId, callback, timeout) {
  postData('/word/move', {
    wordId,
    listId,
  }, callback, timeout);
}

export function updateWord(wordId, wordText, callback, timeout) {
  postData('/word/update', {
    wordId,
    wordText,
  }, callback, timeout);
}

export function deleteWord(wordId, callback, timeout) {
  postData('/word/delete', {
    wordId,
  }, callback, timeout);
}

export function userActivity(callback, timeout) {
  getData('/user/activity', callback, timeout);
}

export function exportData(callback, timeout) {
  getData('/word/export', callback, timeout);
}

export function getToken(callback, timeout) {
  getData('/api/token', callback, timeout);
}

export function generateToken(callback, timeout) {
  postData('/api/generate', {}, callback, timeout);
}

export function deleteToken(callback, timeout) {
  postData('/api/delete', {}, callback, timeout);
}
