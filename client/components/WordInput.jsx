import { h, Component } from 'preact';

export default class WordInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.setState({ text: ''});
  }

  handleChange(evt) {
    if (this.props.handleChange(evt)) {
      this.setState({ text: ''});
    }
  }

  render() {
    return (
      <div className="word-input">
        <input
          className="word-input-box"
          name="word-input"
          type="text"
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          value={this.state.text}
        />
      </div>
    );
  }
}
