import { h, Component } from 'preact';

export default class WordItem extends Component {
  constructor(props) {
    super(props);

    this.handleCheck = this.handleCheck.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

    this.setState({
      word: props.word,
      text: props.word.text,
      translation: null,
      checked: false,
      flipped: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.word != this.state.word) {
      this.setState({
        word: nextProps.word,
        text: nextProps.word.text,
        translation: null,
        checked: false,
        flipped: false,
      });
    }
  }

  handleCheck(e) {
    if (!this.state.checked) {
      this.props.handleCheck(this.props.index);
    }
    // Since it is destroyed, we actually do nothing after handleCheck.
    // If we call `this.setState` here, the next element will inherit the checked box.
  }

  mouseOver() {
    this.setState({ flipped: true });

    if (this.state.translation) {
      this.setState({
        text: this.state.translation,
      });
      return;
    }

    const text = this.state.word.text;
    const token = ''
    const url = `/translate?word=${text}&token=${token}`;
    fetch(url).then((response) => {
      return response.json();
    }).then((json) => {
      const result = json.data.translations;
      if (result) {
        const translation = result[0].translatedText;
        this.setState({ translation });
        if (this.state.flipped) {
          this.setState({ text: translation });
        }
      }
    });
  }

  mouseOut() {
    if (this.state.flipped) {
      // disable
      this.setState({ text: this.state.word.text });
    }
    this.setState({ flipped: false });
  }

  render() {
    return (
      <div className="word-item">
        {this.props.showCheckBox &&
          <div className="word-checkbox">
            <input type="checkbox" onChange={this.handleCheck} checked={this.state.checked} />
          </div>
        }
        <div className="word-text" onMouseOut={this.mouseOut} onMouseOver={this.mouseOver}>
          {this.state.text}
        </div>
      </div>
    );
  }
}
