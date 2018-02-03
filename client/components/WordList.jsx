import { h, Component } from 'preact';

import WordItem from './WordItem';
import WordInput from './WordInput';
import WordCollapse from './WordCollapse';
import WordMore from './WordMore';

export default class WordList extends Component {
  constructor(props) {
    super(props);

    this.setState({
      words: props.words,
      collapsed: true,
      collapseText: 'Show...',
      moreText: 'More...',
    });

    this.handleCollapse = this.handleCollapse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.words != this.state.words) {
      this.setState({
        words: nextProps.words,
      });
    }
  }

  handleCollapse() {
    const collapseText = this.state.collapsed ? 'Collapse...' : 'Show...';
    this.setState({
      collapsed: !this.state.collapsed,
      collapseText,
    });
  }

  render() {
    return (
      <div className="word-list">
        <h3>{this.props.title}</h3>
        {this.props.showInput &&
          <WordInput placeholder=" ✒️ " handleChange={this.props.handleInput} />
        }
        {this.props.showCollapse &&
          <WordCollapse text={this.state.collapseText} handleCollapse={this.handleCollapse} />
        }
        {(!this.props.showCollapse || !this.state.collapsed) &&
          <div className="word-list-container">
            {this.state.words.map((word, index) =>
              <WordItem
                word={word}
                index={index}
                showCheckBox={this.props.showCheckBox}
                handleCheck={this.props.handleCheck}
              />
            )}
            <div className="word-more">
              <WordMore text={this.state.moreText} handleMore={this.props.handleMore} />
            </div>
          </div>
        }
      </div>
    );
  }
}
