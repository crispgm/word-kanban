import { h, Component } from 'preact';

import WordItem from './WordItem';

export default class WordList extends Component {
  constructor(props) {
    super(props);

    this.setState({
      words: props.words,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      words: nextProps.words,
    });
  }

  render() {
    const wordList = this.state.words.map((word, index) =>
      <WordItem
        word={word}
        index={index}
        showCheckBox={this.props.showCheckBox}
        handleFunction={this.props.handleUpdate}
      />
    );

    return (
      <div>
        <h3>{this.props.title}</h3>
        {this.props.showInput &&
          <div>
            <input name="word-input" type="text" />
          </div>
        }
        <div>
          {wordList}
        </div>
      </div>
    );
  }
}
