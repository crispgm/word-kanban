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
  }

  logout() {
    this.props.auth.logout();
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
