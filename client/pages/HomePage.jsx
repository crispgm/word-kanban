import { h, Component } from 'preact';

import Kanban from '../components/Kanban';
import Landing from '../components/Landing';
import { getWords } from '../data';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.setState({
      inbox: [],
      history: [],
      isAuthenticated: false,
    });
  }

  componentWillMount() {
    if (this.isAuthenticated) {
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
    const { isAuthenticated } = this.props.auth;
    this.isAuthenticated = isAuthenticated;

    let content;
    if (!isAuthenticated()) {
      content = (
        <Landing login={this.props.auth.login} />
      );
    } else {
      content = (
        <Kanban inbox={this.state.inbox} history={this.state.history} />
      );
    }

    return (
      <div class="container">
        {content}
      </div>
    )
  }
}
