import { h, Component } from 'preact';

import WordList from '../components/WordList';

export default class Kanban extends Component {
  constructor(props) {
    super(props);

    this.moveToDone = this.moveToDone.bind(this);
    this.moveToInbox = this.moveToInbox.bind(this);

    this.setState({
      rawWords: ['hello', 'world'],
      cookedWords: ['good', 'morning'],
    });
  }

  render() {
    return (
      <div className="kanban">
        <WordList handleUpdate={this.moveToDone} title="📥 Inbox" words={this.state.rawWords} showInput showCheckBox />
        <WordList handleUpdate={this.moveToInbox} title="📝 Done" words={this.state.cookedWords} showCollapse showCheckBox />
      </div>
    )
  }

  moveToDone(index) {
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

  moveToInbox(index) {
    const word = this.state.cookedWords[index];
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
