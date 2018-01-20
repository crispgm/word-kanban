import { h, Component } from 'preact';

export default class AboutPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="setting-settings">
          <h3>Settings</h3>
          <p>
            Nothing now.
          </p>
        </div>
        <div className="setting-about">
          <h3>About</h3>
          <p>
            Word Kanban is a simple Kanban-like word book.
          </p>
        </div>
      </div>
    )
  }
}
