import { h, Component } from 'preact';

export default class WordMore extends Component {
  render() {
    return (
      <div className="word-input">
        <input
          className="word-input-btn"
          name="word-more"
          type="button"
          value={this.props.text}
          onClick={this.props.handleMore}
        />
      </div>
    );
  }
}
