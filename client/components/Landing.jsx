import { h, Component } from 'preact';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <p className="intro">
          <h1 className="intro-title">Word Kanban</h1>
          <div className="intro-text">📘 A simple Kanban-like word book.</div>
        </p>
        <p className="login-buttons">
          <a onClick={this.props.login} href="#">Sign up or Login</a>
        </p>
        <p className="resources">
          <span className="resource">
            <a href="https://github.com/crispgm/word-kanban">GitHub</a>
          </span>
          <span className="resource">
            <a href="https://github.com/crispgm/word-kanban/blob/master/docs/integration.md">APISpecs</a>
          </span>
          <span className="resource">
            <a href="https://www.buymeacoffee.com/zM4m7fd">BuyMeACoffee</a>
          </span>
        </p>
      </div>
    );
  }
}
