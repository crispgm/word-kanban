import { h, Component } from 'preact';
import Trend from 'react-trend';

export default class HeatChart extends Component {
  render() {
    return (
      <div>
        <Trend
          data={this.props.data}
          height={50}
          gradient={['#343a40', '#e64980', '#f03e3e']}
          smooth
          autoDraw
          autoDrawDuration={3000}
          autoDrawEasing="ease-out"
        />
      </div>
    );
  }
}
