import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

import RUSSIAN_PATHS from '../../src/paths/russia.json';

const styleShape = PropTypes.shape({
  stroke: PropTypes.string,
  fill: PropTypes.string,
});

const defaultPathStyle = {
  stroke: '#666',
  fill: '#fff',
};

const defaultSelectedStyle = {
  stroke: '#000',
  fill: '#ccc',
};

const defaultHoverStyle = {
  stroke: '#444',
  fill: '#eee',
};

export default class RussianMap extends PureComponent {

  state = {
    hover: null,
  };

  static propTypes = {
    pathStyle: styleShape,
    selectedStyle: styleShape,
    hoverStyle: styleShape,
    selectedAreas: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    namedStyle: PropTypes.object,
    interactive: PropTypes.bool,
  };

  static defaultProps = {
    pathStyle: defaultPathStyle,
    selectedStyle: defaultSelectedStyle,
    hoverStyle: defaultHoverStyle,
    selectedAreas: [],
    namedStyle: {},
    interactive: false,
  };

  handleAreaClick(name) {
    const { onChange, selectedAreas } = this.props;
    if (onChange) {
      if (selectedAreas.indexOf(name) === -1) {
        onChange([...selectedAreas, name]);
      } else {
        onChange(selectedAreas.filter(areaName => areaName !== name));
      }
    }
  }

  handleAreaEnter(name) {
    this.setState({
      hover: name,
    });
  }

  handleAreaLeave() {
    this.setState({
      hover: null,
    });
  }

  render() {
    const { pathStyle, selectedStyle, hoverStyle, selectedAreas, namedStyle, interactive, ...props } = this.props;
    const { hover } = this.state;
    const mergedPathStyle = { ...defaultPathStyle, ...pathStyle };
    const mergedSelectedStyle = { ...defaultPathStyle, ...defaultSelectedStyle, ...pathStyle, ...selectedStyle };
    const mergedHoverStyle = { ...defaultPathStyle, ...defaultHoverStyle, ...pathStyle, ...hoverStyle };

    const getPathStyle = name => {
      if (selectedAreas.indexOf(name) !== -1) {
        return mergedSelectedStyle;
      }
      if (hover === name) {
        return mergedHoverStyle;
      }
      return mergedPathStyle;
    };

    return (
      <svg viewBox='0 0 680 387' {...props}>
        <g transform='scale(0.68)'>
          {Object.keys(RUSSIAN_PATHS).map(name =>
            <path
              key={name}
              d={RUSSIAN_PATHS[name]}
              style={{ ...getPathStyle(name), ...namedStyle[name] }}
              onClick={interactive && (() => this.handleAreaClick(name))}
              onMouseEnter={interactive && (() => this.handleAreaEnter(name))}
              onMouseLeave={interactive && (() => this.handleAreaLeave())}
            />
          )}
        </g>
      </svg>
    );
  }

}
