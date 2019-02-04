import { h, Component } from 'preact';

import Kanban from '../components/Kanban';
import Landing from '../components/Landing';
import { getWords } from '../data';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const { isAuthenticated } = this.props.auth;

    this.setState({
      inbox: [],
      history: [],
      isAuthenticated: isAuthenticated(),
    });
  }

  componentWillMount() {
    if (this.state.isAuthenticated) {
      this.fetchData();
    }
  }

  fetchData() {
    const self = this;

    getWords(
      1,
      1,
      (json) => {
        self.setState({
          inbox: json.words,
        });
      },
      () => {
        self.setState({
          error: {
            message: 'Loading failed.',
          },
        });
      },
    );

    getWords(
      2,
      1,
      (json) => {
        self.setState({
          history: json.words,
        });
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

  render() {
    let content;
    if (!this.state.isAuthenticated) {
      content = (
        <Landing login={this.props.auth.login} />
      );
    } else {
      content = (
        <Kanban inbox={this.state.inbox} history={this.state.history} />
      );
    }

    return (
      <div className="container">
        {content}
      </div>
    );
  }
}
