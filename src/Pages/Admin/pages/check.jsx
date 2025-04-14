import React from 'react';

const DisplayName = () => {
  const name = "Prakhar Srivastav";

  return (
    <div>
      <h1>Hello, {name}!</h1>

      <div style={{ width: '100%', height: '400px', backgroundColor: 'lightblue' }}>
        <h2>First Div</h2>
      </div>

      <div style={{ width: '100%', height: '400px', backgroundColor: 'lightgreen' }}>
        <h2>Second Div</h2>
      </div>

      <div style={{ width: '100%', height: '400px', backgroundColor: 'lightcoral' }}>
        <h2>Third Div</h2>
      </div>
    </div>
  );
};

export default DisplayName;
