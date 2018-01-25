import { h, Component } from 'preact';

import Kanban from '../components/Kanban';
import { getWordList } from '../data';

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

    getWordList(
      1,
      (json) => {
        self.setState({
          inbox: json.words,
          history: [],
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
