import { h, Component } from 'preact';

export default class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <p>
          <h3>404 Not Found</h3>
          <div>Enjoy the nice <a href="https://unsplash.com">Unsplash</a> photo? Or go back to <a href="/">home page</a>.</div>
        </p>
        <img src="https://source.unsplash.com/random" alt="Unsplash Random" />
      </div>
    )
  }
}
