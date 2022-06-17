import React from 'react';
import Progress from './Progress';

function Reading({ label, unit, value, max, idealRange }) {
  return (
    <div className="reading">
      <div className="label">{label}</div>
      <div className="unit">({unit})</div>
      <div className="value">{value}</div>
      <Progress value={value} max={max} />
      <div className="range">
        <div>Ideal Range</div>
        <div>{idealRange}</div>
      </div>
    </div>
  );
}

export default Reading;
