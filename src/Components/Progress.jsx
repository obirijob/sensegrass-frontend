import React, { useState, useEffect } from 'react';

function Progress({ value, max }) {
  const [color, setColor] = useState('#c24123');
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    setPerc(p => (value / max) * 100);
    if (perc > 25 && perc < 60) {
      setColor(c => '#cdad2b');
    }
    if (perc >= 60) {
      setColor(c => '#1be460');
    }
  }, [value, max]);

  return (
    <div className="progress">
      <div
        className="bar"
        style={{
          width: `${perc}%`,
          backgroundColor:
            perc > 25 && perc < 60
              ? '#cdad2b'
              : perc >= 60
              ? '#1be460'
              : '#c24123',
        }}
      ></div>
    </div>
  );
}

export default Progress;
