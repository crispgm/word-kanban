import { h, Component } from 'preact';

import Kanban from '../components/Kanban';
import { getWords } from '../data';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.setState({
      inbox: [],
      history: [],
    });

    this.login.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const self = this;

    getWords(
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

  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated()) {
      this.login();
    }

    return (
      <div class="container">
        <Kanban inbox={this.state.inbox} history={this.state.history} />
      </div>
    )
  }
}
