import { h, Component } from 'preact';

import WordList from '../components/WordList';

export default class Kanban extends Component {
  render() {
    const rawWords = ['hello', 'world'];
    const cookedWords = ['good', 'morning'];
    return (
      <div>
        <WordList title="Raw" words={rawWords} showInput showCheckBox />
        <WordList title="Cooked" words={cookedWords} draggable />
      </div>
    )
  }
}
