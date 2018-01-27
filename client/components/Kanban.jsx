import { h, Component } from 'preact';

import WordList from '../components/WordList';
import { createWord, moveWord } from '../data';

export default class Kanban extends Component {
  constructor(props) {
    super(props);

    this.moveToHistory = this.moveToHistory.bind(this);
    this.moveToInbox = this.moveToInbox.bind(this);
    this.newEntry = this.newEntry.bind(this);

    this.setState({
      inbox: props.inbox,
      history: props.history,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inbox: nextProps.inbox,
      history: nextProps.history,
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
    const self = this;
    if (word && word.length > 0) {
      createWord(
        word,
        1,
        (json) => {
          const inbox = self.state.inbox;
          inbox.splice(0, 0, json);
          self.setState({
            inbox,
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
  }

  moveToHistory(index) {
    const word = this.state.inbox[index];
    const inbox = this.state.inbox;
    const history = this.state.history;
    inbox.splice(index, 1);
    history.splice(0, 0, word);

    moveWord(
      word.id,
      2,
      (json) => {
        this.setState({
          inbox,
          history,
        });
        return true;
      },
      () => {
        self.setState({
          error: {
            message: 'Move failed.',
          },
        });
        return false;
      },
    );
  }

  moveToInbox(index) {
    const word = this.state.history[index];
    const history = this.state.history;
    const inbox = this.state.inbox;
    history.splice(index, 1);
    inbox.splice(0, 0, word);

    this.setState({
      inbox,
      history,
    });
  }
}
