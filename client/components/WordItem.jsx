import { h, Component } from 'preact';

export default class WordItem extends Component {
  constructor(props) {
    super(props);

    this.handleCheck = this.handleCheck.bind(this);
    this.setState({
      checked: false,
    });
  }

  handleCheck(e) {
    if (!this.state.checked) {
      this.props.handleCheck(this.props.index);
    }
    // Since it is destroyed, we actually do nothing after handleCheck.
    // If we call `this.setState` here, the next element will inherit the checked box.
  }

  render() {
    return (
      <div className="word-item">
        {this.props.showCheckBox &&
          <input type="checkbox" onChange={this.handleCheck} checked={this.state.checked} />
        }
        {this.props.word}
      </div>
    );
  }
}
