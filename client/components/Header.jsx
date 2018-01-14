import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

export default class Header extends Component {
  render() {
    return (
      <div>
        <Link href="/">Kanban</Link>
        <Link href="/about">About</Link>
      </div>
    );
  }
}
