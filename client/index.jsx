// client/index.js
import Router from 'preact-router';
import { h, render } from 'preact';
// pages
import HomePage from './pages/HomePage';
import SettingPage from './pages/SettingPage';
import Callback from './pages/Callback';
import NotFound from './pages/NotFound';
// layouts
import Header from './layouts/Header';
import Footer from './layouts/Footer';
// auth
import Auth from './auth';
// styles
import './styles/index.scss';

// init auth0 client
const auth = new Auth();

// main router
const Main = () => (
  <Router>
    <HomePage path="/" auth={auth} />
    <SettingPage path="/setting" auth={auth} />
    <Callback path="/callback" auth={auth} />
    <NotFound path="/404" default />
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
