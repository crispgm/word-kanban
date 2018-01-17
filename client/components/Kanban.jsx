import { h, Component } from 'preact';

import WordList from '../components/WordList';

export default class Kanban extends Component {
  constructor(props) {
    super(props);

    this.cookWord = this.cookWord.bind(this);
    this.uncookWord = this.uncookWord.bind(this);

    this.setState({
      rawWords: ['hello', 'world'],
      cookedWords: ['good', 'morning'],
    });
  }

  render() {
    return (
      <div>
        <WordList handleUpdate={this.cookWord} title="Raw" words={this.state.rawWords} showInput showCheckBox />
        <WordList handleUpdate={this.uncookWord} title="Cooked" words={this.state.cookedWords} draggable />
      </div>
    )
  }

  cookWord(index) {
    const word = this.state.rawWords[index];
    const rawWords = this.state.rawWords;
    const cookedWords = this.state.cookedWords;
    rawWords.splice(index, 1);
    cookedWords.splice(this.state.cookedWords.length, 0, word);
    this.setState({
      rawWords,
      cookedWords,
    });
  }

  uncookWord(index) {
    const cookedWords = this.state.cookedWords;
    const rawWords = this.state.rawWords;
    cookedWords.splice(index, 1);
    rawWords.splice(this.state.rawWords.length, 0, word);
    this.setState({
      rawWords,
      cookedWords,
    });
  }
}
