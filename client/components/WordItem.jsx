import { h, Component } from 'preact';

import { updateWord } from '../data';

export default class WordItem extends Component {
  constructor(props) {
    super(props);

    this.handleCheck = this.handleCheck.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);

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

  handleInput(e) {
    e.preventDefault();
    if (e.target.innerText !== this.state.text) {
      this.setState({
        text: e.target.innerText,
      });
    }
  }

  handleEdit(e) {
    if (e.target.innerText !== this.state.word.text) {
      const self = this;
      const newWord = this.state.word;
      newWord.text = e.target.innerText;
      // update
      if (e.target.innerText) {
        updateWord(
          this.state.word.id,
          e.target.innerText,
          (json) => {
            self.setState({
              text: e.target.innerText,
              word: newWord,
            });
            return true;
          },
          () => {
            self.setState({
              error: {
                message: 'Create failed.',
              },
            });
            return false;
          },
        );
      }
      // delete
      if (e.target.innerText === '') {
        this.props.handleDelete(newWord);
      }
    }
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleEdit(e);
    }
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
    const url = `/translate?word=${text}`;
    fetch(url, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    }).then((response) => {
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
    const dictUrl = `https://www.merriam-webster.com/dictionary/${this.state.word.text}`;
    return (
      <div className="word-item">
        {this.props.showCheckBox &&
          <div className="word-checkbox">
            <input type="checkbox" onChange={this.handleCheck} checked={this.state.checked} />
          </div>
        }
        <div className="word-text">
          <div className="word-text-icon" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
            <a href={dictUrl} target="_blank" rel="noopener noreferrer">➡️</a>
          </div>
          <div className="word-text-main"
            contenteditable="true"
            onInput={this.handleInput}
            onKeyPress={this.handleEnter}
            onBlur={this.handleEdit}>
            {this.state.text}
          </div>
        </div>
      </div>
    );
  }
}
