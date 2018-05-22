import { h, Component } from 'preact';

export default class Callback extends Component {
  render() {
    this.props.auth.handleAuthentication();

    return (
      <div>
        Authenticating...
      </div>
    );
  }
}
