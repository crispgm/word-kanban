import { h, Component } from 'preact';
import ErrorMessage from '../components/ErrorMessage';
import HeatChart from '../components/HeatChart';

import { userActivity, getToken, generateToken, deleteToken } from '../data';

export default class AboutPage extends Component {
  constructor(props) {
    super(props);

    if (!this.props.auth.isAuthenticated()) {
      window.location.href = '/';
    }

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
    this.handleCopy = this.handleCopy.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleExportJSON = this.handleExportJSON.bind(this);

    this.setState({
      token: '-',
      activity: [],
    });
  }

  componentWillMount() {
    this.fetchUserActivity();
    this.fetchUserToken();
  }

  fetchUserActivity() {
    const self = this;

    userActivity(
      (json) => {
        if (json.error !== 'success') {
          const data = [];
          for (const day of json.data) {
            data.push(parseInt(day.count, 10));
          }
          self.setState({
            activity: data,
          });
        } else {
          self.setState({
            error: {
              message: json.error,
            },
          });
        }
      },
      () => {
        self.setState({
          error: {
            message: 'Loading failed.',
          },
        });
      },
    );
  }

  fetchUserToken() {
    const self = this;

    getToken(
      (json) => {
        if (json.error !== 'success') {
          self.setState({
            token: json.token,
          });
        } else {
          self.setState({
            error: {
              message: json.error,
            },
          });
        }
      },
      () => {
        self.setState({
          error: {
            message: 'Loading failed.',
          },
        });
      },
    );
  }

  logout() {
    this.props.auth.logout();
  }

  handleGenerate(e) {
    const self = this;

    generateToken(
      (json) => {
        if (json.status === 0) {
          self.setState({
            token: json.token,
          });
        } else {
          self.setState({
            error: {
              message: json.message,
            },
          });
        }
      },
      () => {
        self.setState({
          error: {
            message: 'Generate token error.',
          },
        });
      },
    );
  }

  handleDelete(e) {
    const self = this;

    deleteToken(
      (json) => {
        if (json.status === 0) {
          self.setState({
            token: '-',
          });
        } else {
          self.setState({
            error: {
              message: json.message,
            },
          });
        }
      },
      () => {
        self.setState({
          error: {
            message: 'Delete token error.',
          },
        });
      },
    );
  }

  handleCopy(e) {
    this._input.select();
    const successful = document.execCommand('copy');
    this.setState({
      error: {
        message: successful ? 'Copied to clipboard.' : 'Copy failed.',
      },
    });
  }

  handleExportJSON() {
    window.location.href = '/word/export';
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
          <h3>Activities</h3>
          {this.state.activity.length > 2 &&
            <HeatChart data={this.state.activity} />
          }
        </div>
        <div className="setting-settings">
          <h3>Integration</h3>
          <p>
            Word Kanban provides a simple API for integrations. <a href="https://github.com/crispgm/word-kanban/tree/master/docs/integration.md">Documentation and API Specification</a>.
          </p>
          <p>
            <input type="text" value={this.state.token} readonly ref={(input) => { this._input = input; }} />
            <input type="button" value="Copy" onClick={this.handleCopy} />
            <input type="button" value="Generate" onClick={this.handleGenerate} />
            <input type="button" value="Delete" onClick={this.handleDelete} className="input-btn-delete" />
          </p>
        </div>
        <div className="setting-settings">
          <h3>Data Export</h3>
          <p>
            <input type="button" value="Export JSON" onClick={this.handleExportJSON} />
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
        {this.state.error &&
          <ErrorMessage error={this.state.error} />
        }
      </div>
    )
  }
}
