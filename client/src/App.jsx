import React from "react";

function App() {
  const handleClick = () => {
    alert("Button clicked 🚀");
  };

  return (
    <>
      <h1 className="text-blue-950 bg-red-400 p-4 rounded-lg">
        Welcome to Onboard!
      </h1>
      <button
        onClick={handleClick}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Click Me
      </button>
    </>
  );
}

export default App;
