import { h, Component } from 'preact';

import WordList from '../components/WordList';

export default class Kanban extends Component {
  constructor(props) {
    super(props);

    this.moveToHistory = this.moveToHistory.bind(this);
    this.moveToInbox = this.moveToInbox.bind(this);
    this.newEntry = this.newEntry.bind(this);

    this.setState({
      inbox: ['hello', 'world'],
      history: ['good', 'morning'],
    });
  }

  render() {
    return (
      <div className="kanban">
        <WordList
          title="📥 Inbox"
          words={this.state.inbox}
          showInput
          handleInput={this.newEntry}
          showCheckBox
          handleCheck={this.moveToHistory} 
        />
        <WordList
          title="📝 Done"
          words={this.state.history}
          showCollapse
          showCheckBox
          handleCheck={this.moveToInbox}
        />
      </div>
    )
  }

  newEntry(evt) {
    const word = evt.target.value;
    if (word && word.length > 0) {
      const inbox = this.state.inbox;
      inbox.splice(this.state.inbox.length, 0, word);
      this.setState({
        inbox,
      });
      return true;
    }
    return false;
  }

  moveToHistory(index) {
    const word = this.state.inbox[index];
    const inbox = this.state.inbox;
    const history = this.state.history;
    inbox.splice(index, 1);
    history.splice(this.state.history.length, 0, word);
    this.setState({
      inbox,
      history,
    });
  }

  moveToInbox(index) {
    const word = this.state.history[index];
    const history = this.state.history;
    const inbox = this.state.inbox;
    history.splice(index, 1);
    inbox.splice(this.state.inbox.length, 0, word);
    this.setState({
      inbox,
      history,
    });
  }
}
