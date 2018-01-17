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
      this.props.handleFunction(this.props.index);
    }
    this.setState({
      checked: !this.state.checked,
    });
  }

  render() {
    return (
      <div>
        {this.props.showCheckBox &&
          <input type="checkbox" onChange={this.handleCheck} />
        }
        {this.props.word}
      </div>
    );
  }
}
