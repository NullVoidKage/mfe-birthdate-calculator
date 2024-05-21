import React from 'react';

const MyRadialProgress: React.FC<{ value: number }> = ({ value }) => {
    const style = { '--value': value.toString() } as React.CSSProperties;

      

  return (
    <div
      className="radial-progress text-primary"
      style={style}
      role="progressbar"
    >
      {value}%
    </div>
  );
};

export default MyRadialProgress;
