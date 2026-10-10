import { h, Component } from 'preact';
import { createPortal } from 'preact/compat';

export default class ErrorMessage extends Component {
  render() {
    return createPortal(
      <div className="error">
        <div className="error-wrap">
          <div className="error-message">
            {this.props.error.message}
          </div>
        </div>
      </div>,
      document.body,
    );
  }
}
