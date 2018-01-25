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
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
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
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
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

export function getWords(listId, callback, timeout) {
  getData('/word/get', callback, timeout);
}

export function createWord(word, listId, callback, timeout) {
  postData('/word/create', {
    word: word,
    listId: listId,
  }, callback, timeout);
}

