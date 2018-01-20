import { h, Component } from 'preact';

export default class WordInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    if (this.props.handleChange(evt)) {
      evt.target.value = ""
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
        />
      </div>
    );
  }
}
