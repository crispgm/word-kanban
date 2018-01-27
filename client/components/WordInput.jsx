import { h, Component } from 'preact';

export default class WordInput extends Component {
  constructor(props) {
    super(props);

    this.handleEnter = this.handleEnter.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.setState({ text: '' });
  }

  handleEnter(evt) {
    if (evt.key === 'Enter') {
      if (this.props.handleChange(evt)) {
        this.setState({ text: '' });
      }
    }
  }

  handleFocus(evt) {
    evt.target.placeholder = '';
  }

  handleBlur(evt) {
    evt.target.placeholder = this.props.placeholder;
  }

  render() {
    return (
      <div className="word-input">
        <input
          className="word-input-box"
          name="word-input"
          type="text"
          placeholder={this.props.placeholder}
          onKeyPress={this.handleEnter}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={this.state.text}
        />
      </div>
    );
  }
}
