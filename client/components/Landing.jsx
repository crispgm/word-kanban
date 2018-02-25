import { h, Component } from 'preact';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <h1>Word Kanban</h1>
        <p className="intro">
          <div className="intro-text">📘 A simple Kanban-like word book.</div>
        </p>
        <p className="login-buttons">
          <a onClick={this.props.login} href="#">Sign up</a>
          <a onClick={this.props.login} href="#">Login</a>
        </p>
        <p className="footnotes">
          <div className="footnote">Landing photo is from <a href="https://unsplash.com">Unsplash</a>, and the author is <a href="https://unsplash.com/@anniespratt">Annie Spratt</a> and <a href="https://unsplash.com/@bethlaird">Bethany Laird</a>.</div>
        </p>
        <p className="resources">
          <span className="resource">
            <a href="https://github.com/crispgm/word-kanban">GitHub</a>
          </span>
          <span className="resource">
            <a href="https://github.com/crispgm/word-kanban/blob/master/docs/integration.md">API</a>
          </span>
          <span className="resource">
            <a href="https://www.buymeacoffee.com/zM4m7fd">BuyMeACoffee</a>
          </span>
        </p>
      </div>
    );
  }
}
