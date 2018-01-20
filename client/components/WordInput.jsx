import { h, Component } from 'preact';

export default class WordInput extends Component {
  render() {
    return (
      <div className="word-input">
        <input className="word-input-box" name="word-input" type="text" placeholder={this.props.placeholder} />
      </div>
    );
  }
}
