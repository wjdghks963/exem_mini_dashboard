import React from "react";

function App() {
  const a = async () => {
    const aa = await fetch("/timeseries?from=1645663863&to=1645836663").then(
      (data) => data.json()
    );
    console.log(aa);
  };

  a();

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
