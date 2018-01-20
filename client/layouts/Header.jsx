import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

export default class Header extends Component {
  render() {
    return (
      <header className="container">
        <div className="header-more">
          <Link className="header-link" href="/setting">⚙️</Link>
        </div>
        <div className="header-icon">
          <Link className="header-link" href="/">WK</Link>
        </div>
      </header>
    );
  }
}
