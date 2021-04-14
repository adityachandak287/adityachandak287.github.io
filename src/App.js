import React, { Component } from "react";
import "./App.css";
import BackgroundSketch from "./components/BackgroundSketch/BackgroundSketch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BackgroundSketch />
        <div className="container">
          <div className="flex-row-container intro">
            <h1 className="intro-main">Hey, I'm Aditya Chandak</h1>
            <div className="intro-content">
              <p>I'm an IT Engineer who's passionate about his work.</p>
              <p>Interested in all things tech.</p>
            </div>
            <div className="intro-links">
              <a
                href="https://github.com/adityachandak287"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub} color="white" />
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-c-857b79100/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin} color="white" />
              </a>
            </div>
            <div className="intro-announcement">
              <p>Stay Tuned. More coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
