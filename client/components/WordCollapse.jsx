import { h, Component } from 'preact';

export default class WordCollapse extends Component {
  render() {
    return (
      <div className="word-input">
        <input
          className="word-input-btn"
          name="word-collapse"
          type="button"
          value={this.props.text}
          onClick={this.props.handleCollapse}
        />
      </div>
    );
  }
}
