import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

export default class Header extends Component {
  render() {
    return (
      <header className="container">
        <Link className="header-link" href="/">Kanban</Link>
        <Link className="header-link" href="/about">About</Link>
      </header>
    );
  }
}
