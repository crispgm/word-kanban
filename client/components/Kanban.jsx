import { h, Component } from 'preact';

import WordList from '../components/WordList';
import ErrorMessage from '../components/ErrorMessage';
import { createWord, moveWord, getWords, deleteWord } from '../data';

export default class Kanban extends Component {
  constructor(props) {
    super(props);

    this.moveToInbox = this.moveToInbox.bind(this);
    this.moveToHistory = this.moveToHistory.bind(this);
    this.newEntry = this.newEntry.bind(this);
    this.inboxMore = this.inboxMore.bind(this);
    this.historyMore = this.historyMore.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.setState({
      inbox: props.inbox,
      inboxPage: 1,
      history: props.history,
      historyPage: 1,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inbox: nextProps.inbox,
      history: nextProps.history,
    });
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

    const self = this;
    moveWord(
      word.id,
      2,
      () => {
        self.setState({
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

    const self = this;
    moveWord(
      word.id,
      1,
      () => {
        self.setState({
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

  inboxMore() {
    const self = this;
    getWords(
      1,
      this.state.inboxPage + 1,
      (json) => {
        if (!json.words || json.words.length === 0) {
          self.setState({
            error: {
              message: 'No more words.',
            },
          });
          return false;
        }
        self.setState({
          inbox: this.state.inbox.concat(json.words),
          inboxPage: this.state.inboxPage + 1,
        });
        return true;
      },
      () => {
        self.setState({
          error: {
            message: 'Loading failed.',
          },
        });
      },
    );
  }

  historyMore() {
    const self = this;
    getWords(
      2,
      this.state.historyPage + 1,
      (json) => {
        if (!json.words || json.words.length === 0) {
          self.setState({
            error: {
              message: 'No more words.',
            },
          });
          return false;
        }
        self.setState({
          history: this.state.history.concat(json.words),
          historyPage: this.state.historyPage + 1,
        });
        return true;
      },
      () => {
        self.setState({
          error: {
            message: 'Loading failed.',
          },
        });
      },
    );
  }

  handleDelete(word) {
    const self = this;
    deleteWord(
      word.id,
      () => {
        let wordList = [];
        if (word.listId === 1) {
          wordList = self.state.inbox;
        } else if (word.listId === 2) {
          wordList = self.state.history;
        }
        for (const [index, item] of wordList.entries()) {
          if (item.id === word.id) {
            wordList.splice(index, 1);
            if (word.listId === 1) {
              self.setState({ inbox: wordList });
            } else if (word.listId === 2) {
              self.setState({ history: wordList });
            }
            break;
          }
        }
        return true;
      },
      () => {
        self.setState({
          error: {
            message: 'Delete failed.',
          },
        });
        return false;
      },
    );
  }

  render() {
    return (
      <div className="kanban">
        <WordList
          title="📥 Inbox"
          words={this.state.inbox}
          showCheckBox
          showInput
          handleInput={this.newEntry}
          handleCheck={this.moveToHistory}
          handleMore={this.inboxMore}
          handleDelete={this.handleDelete}
        />
        <WordList
          title="📝 Done"
          words={this.state.history}
          showCheckBox
          showCollapse
          handleCheck={this.moveToInbox}
          handleMore={this.historyMore}
          handleDelete={this.handleDelete}
        />
        {this.state.error &&
          <ErrorMessage error={this.state.error} />
        }
      </div>
    );
  }
}
