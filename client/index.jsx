// client/index.js
import Router from 'preact-router';
import { h, render } from 'preact';
import { createHashHistory } from 'history';
// pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';
// layouts
import Header from './layouts/Header';
import Footer from './layouts/Footer';

// handling changeRoute event
const changeRoute = (e) => {
};

// main router
const Main = () => (
  <Router history={createHashHistory()} onChange={changeRoute}>
    <HomePage path="/" />
    <AboutPage path="/about" />
    <NotFound path="*" default />
  </Router>
);

// main app
const App = () => (
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
);

// render to body
render(<App />, document.body);
