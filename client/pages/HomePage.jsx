import { h, Component } from 'preact';

import Kanban from '../components/Kanban';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Kanban />
      </div>
    )
  }
}
