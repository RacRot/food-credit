import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    fetch('http://localhost:5001/health')
      .then(response => response.json())
      .then(data => console.log('The Server said: ', data));
  })
  return(
    <div className="App">
      <h1> Hello, World! </h1>
    </div>
  );
};

export default App;
