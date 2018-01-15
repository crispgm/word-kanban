import { h, Component } from 'preact';

import WordItem from './WordItem';

export default class WordList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const wordList = this.props.words.map((word) =>
      <WordItem word={word} showCheckBox={this.props.showCheckBox} />
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
