import { h, Component } from 'preact';

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        <div className="setting-settings">
          <h3>Settings</h3>
          <p>
          {(isAuthenticated() &&
            <input type="button" value="Logout" onClick={this.logout} />
          )} 
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
