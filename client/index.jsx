// client/index.js
import Router from 'preact-router';
import { h, render } from 'preact';
import { createHashHistory } from 'history';
// pages
import HomePage from './pages/HomePage';
import SettingPage from './pages/SettingPage';
import NotFound from './pages/NotFound';
// layouts
import Header from './layouts/Header';
import Footer from './layouts/Footer';
// styles
import './styles/index.scss';

// handling changeRoute event
const changeRoute = (e) => {
};

// main router
const Main = () => (
  <Router history={createHashHistory()} onChange={changeRoute}>
    <HomePage path="/" />
    <SettingPage path="/setting" />
    <NotFound path="*" default />
  </Router>
);

// main app
const App = () => (
  <div className="main">
    <Header />
    <Main />
    <Footer />
  </div>
);

// render to body
render(<App />, document.body);
