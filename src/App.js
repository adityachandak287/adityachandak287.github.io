import React, { Component } from "react";
import "./App.css";
import BackgroundSketch from "./components/BackgroundSketch";
class App extends Component {
  render() {
    return (
      <div className="App">
        <BackgroundSketch />
        <div className="test">
          <h1>Aditya Chandak</h1>
          <p>I beleive technology can be used to better our lives.</p>
          <p>Interested in all things tech.</p>
        </div>
      </div>
    );
  }
}

export default App;
