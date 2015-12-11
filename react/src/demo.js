import React from 'react';
import ReactDOM from 'react-dom';
import RussianMap from './RussianMap';

const interactive = document.createElement('div');
document.body.appendChild(interactive);

let changeSelectedAreas;
let selectedAreas = [];

function render() {
  ReactDOM.render(
    <RussianMap
      interactive
      onChange={areas => changeSelectedAreas(areas)}
      selectedAreas={selectedAreas}
      pathStyle={{ cursor: 'pointer' }}
      selectedStyle={{ fill: 'teal' }}
      style={{ width: 400 }}/>,
    interactive);
}

changeSelectedAreas = areas => {
  selectedAreas = areas;
  render();
};

render();

const staticMap = document.createElement('div');
document.body.appendChild(staticMap);

ReactDOM.render(
  <RussianMap
    style={{ width: 400 }}
    namedStyle={{ MOW: { fill: 'red' }, SPE: { fill: 'navy' } }}/>,
  staticMap
);
