import { h, Component } from 'preact';

export default class AboutPage extends Component {
  constructor(props) {
    super(props);

    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }

    this.logout = this.logout.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.setState({
      token: '-',
    });
  }

  logout() {
    this.props.auth.logout();
  }

  handleGenerate(e) {
  }

  handleDelete(e) {
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.state;

    return (
      <div className="container">
        <div className="setting-settings">
          <h3>Settings</h3>
          <p>
          {(isAuthenticated() &&
            <div className="profile">
              <div className="profile-picture"><img src={profile.picture} alt="profile" /></div>
              <div className="profile-name">{profile.nickname}</div>
              <div className="profile-logout"><input type="button" value="Logout" onClick={this.logout} /></div>
            </div>
          )} 
          </p>
        </div>
        <div className="setting-settings">
          <h3>Integration</h3>
          <p>Word Kanban provides a simple API for integrations. <a href="https://github.com/crispgm/word-kanban/tree/master/docs/integration.md">API Specification</a>.</p>
          <p>
            <input type="text" value={this.state.token} readonly />
            <input type="button" value="Generate" onClick={this.handleGenerate} />
            <input type="button" value="Delete" onClick={this.handleDelete} className="input-btn-delete" />
          </p>
        </div>
        <div className="setting-about">
          <h3>About</h3>
          <p>
            Word Kanban is a simple Kanban-like word book.
          </p>
          <p>
            <a href="https://github.com/crispgm/word-kanban">Fork on GitHub</a>.
          </p>
        </div>
      </div>
    )
  }
}
