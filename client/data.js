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
  timeoutify(fetch(url), 3000)
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

function postData(url, form, callback) {
  startProgress();
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(form),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      endProgress();
      return response.json();
    })
    .then((json) => { callback(json); });
}

export function getWordList(listId, callback, timeout) {
  getData('/word/get', callback, timeout);
}
