import { h, Component } from 'preact';

import WordItem from './WordItem';
import WordInput from './WordInput';
import WordCollapse from './WordCollapse';

export default class WordList extends Component {
  constructor(props) {
    super(props);

    this.setState({
      words: props.words,
      collapsed: false,
    });

    this.handleCollapse = this.handleCollapse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      words: nextProps.words,
    });
  }

  handleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const wordList = this.state.words.map((word, index) =>
      <WordItem
        word={word}
        index={index}
        showCheckBox={this.props.showCheckBox}
        handleCheck={this.props.handleCheck}
      />
    );

    return (
      <div className="word-list">
        <h3>{this.props.title}</h3>
        {this.props.showInput &&
          <WordInput placeholder=" ✒️ " handleChange={this.props.handleInput} />
        }
        {this.props.showCollapse &&
          <WordCollapse text="Collapse..." handleCollapse={this.handleCollapse} />
        }
        {!this.state.collapsed &&
          <div>
            {wordList}
          </div>
        }
      </div>
    );
  }
}
