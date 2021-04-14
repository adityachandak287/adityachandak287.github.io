import React, { Component } from "react";
import "./BackgroundSketch.module.css";

var p5 = require("p5");
export class BackgroundSketch extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  Sketch = (p) => {
    p.canvas = null;
    p.widthPercent = 1;
    p.heightPercent = 1;
    p.bgFlag = 0;

    // (p.xBound = {}), (p.yBound = {});

    // p.currX, p.currY, (p.dirX = 0), (p.dirY = 0), (p.seg = 0);
    // p.fillColor = null;
    p.points = [];

    p.numberOfPoints = p.ceil(
      p.map(p.windowWidth * p.windowHeight, 360 * 640, 1280 * 720, 5, 10)
    );
    console.log(p.numberOfPoints);
    p.setup = () => {
      // const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      // const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      p.canvas = p.createCanvas(
        p.windowWidth * p.widthPercent,
        p.windowHeight * p.heightPercent
      );
      p.canvas.style("z-index", "-1");
      p.centerCanvas();
      p.background(0);

      p.xBound = {
        min: -p.windowWidth * 0,
        max: p.windowWidth * 1,
      };
      p.yBound = {
        min: -p.windowHeight * 0,
        max: p.windowHeight * 1,
      };

      for (let i = 0; i < p.numberOfPoints; i++) {
        p.points.push({
          currX: 0,
          currY: 0,
          dirX: 0,
          dirY: 0,
          seg: 0,
          fillColor: p.color(
            `rgba(${parseInt(p.random(255))}, ${parseInt(
              p.random(255)
            )}, ${parseInt(p.random(255))},0.25)`
          ),
        });
      }
      p.points.forEach((point) => {
        // point.currX = windowWidth / 2;
        // point.currY = windowHeight / 2;
        point.currX = p.random(p.windowWidth);
        point.currY = p.random(p.windowHeight);
        p.setRandomDirection(point);
        // setRandomSeg(point);
        p.setRandomFillColor(point);
      });
      p.setRandomSeg();
    };

    p.centerCanvas = () => {
      const factor = (1 - p.widthPercent) / 2;
      p.canvas.position(p.width * factor, p.height * factor);
    };

    p.setRandomDirection = (point) => {
      point.dirX = p.random(
        [-1, 0, 1].filter((valX) => valX !== -1 * point.dirX)
      );
      point.dirY =
        point.dirX !== 0
          ? p.random([-1, 0, 1].filter((valY) => valY !== -1 * point.dirY))
          : p.random([-1, 1]);
      // dirX = random([-1, 0, 1]);
      // dirY = random([-1, 0, 1]);
      // point.dirX = point.dirY == 0 ? 0 : 1;
      // point.dirY = point.dirY == 0 ? 1 : 0;
    };

    p.setRandomFillColor = (point) => {
      point.fillColor = p.color(
        `rgba(${parseInt(p.random(255))}, ${parseInt(
          p.random(255)
        )}, ${parseInt(p.random(255))},0.25)`
      );
    };

    p.setRandomSeg = () => {
      // p.seg = p.random(40, 320);
      const tempSeg = p.random(40, 320);
      p.points.forEach((point) => {
        point.seg = tempSeg;
      });
    };

    p.windowResized = () => {
      p.resizeCanvas(
        p.windowWidth * p.widthPercent,
        p.windowHeight * p.heightPercent
      );
      p.centerCanvas();
      p.background(0);
      p.xBound = {
        min: -p.windowWidth * 0,
        max: p.windowWidth * 1,
      };
      p.yBound = {
        min: -p.windowHeight * 0,
        max: p.windowHeight * 1,
      };
    };

    p.draw = () => {
      for (let rep = 1; rep <= 5; rep++) {
        p.points.forEach((point) => {
          p.fill(point.fillColor);
          p.noStroke();
          p.circle(point.currX, point.currY, 5);

          point.currX += point.dirX;
          point.currY += point.dirY;

          point.seg--;

          if (point.seg <= 0) {
            // background("rgba(0,0,0,0.75)");
            p.bgFlag++;
            // setRandomSeg(point);
            p.setRandomDirection(point);
            p.setRandomFillColor(point);
          }

          if (point.currX <= p.xBound.min) point.currX = p.xBound.max;
          else if (point.currX >= p.xBound.max) point.currX = p.xBound.min;

          if (point.currY <= p.yBound.min) point.currY = p.yBound.max;
          else if (point.currY >= p.yBound.max) point.currY = p.yBound.min;
        });
        if (p.bgFlag > 0) {
          p.setRandomSeg();
          p.background("rgba(0,0,0,0.75)");
          p.bgFlag = 0;
        }
      }
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    //style={{ overflow: "hidden" }}
    return <div className="background-sketch" ref={this.myRef}></div>;
  }
}

export default BackgroundSketch;

/*
  Sketch = (p) => {
    p.canvas = null;
    p.widthPercent = 1;
    p.heightPercent = 1;

    // (p.xBound = {}), (p.yBound = {});

    // p.currX, p.currY, (p.dirX = 0), (p.dirY = 0), (p.seg = 0);
    p.fillColor = null;

    p.setup = () => {
      // const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      // const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      p.canvas = p.createCanvas(
        p.windowWidth * p.widthPercent,
        p.windowHeight * p.heightPercent
      );
      p.canvas.style("z-index", "-1");
      p.centerCanvas();
      p.background(0);

      p.xBound = {
        min: -p.windowWidth * 0,
        max: p.windowWidth * 1,
      };
      p.yBound = {
        min: -p.windowHeight * 0,
        max: p.windowHeight * 1,
      };
      p.currX = p.windowWidth / 2;
      p.currY = p.windowHeight / 2;
      p.setRandomDirection();
      p.setRandomSeg();
      p.setRandomFillColor();
    };

    p.centerCanvas = () => {
      const factor = (1 - p.widthPercent) / 2;
      p.canvas.position(p.width * factor, p.height * factor);
    };

    p.setRandomDirection = () => {
      p.dirX = p.random([-1, 0, 1].filter((valX) => valX !== -1 * p.dirX));
      p.dirY =
        p.dirX !== 0
          ? p.random([-1, 0, 1].filter((valY) => valY !== -1 * p.dirY))
          : p.random([-1, 1]);
      // dirX =p.random([-1, 0, 1]);
      // dirY =p.random([-1, 0, 1]);
    };

    p.setRandomFillColor = () => {
      p.fillColor = p.color(
        `rgba(${parseInt(p.random(255))}, ${parseInt(
          p.random(255)
        )}, ${parseInt(p.random(255))},0.25)`
      );
    };

    p.setRandomSeg = () => {
      p.seg = p.random(40, 320);
    };

    p.windowResized = () => {
      p.resizeCanvas(
        p.windowWidth * p.widthPercent,
        p.windowHeight * p.heightPercent
      );
      p.centerCanvas();
      p.background(0);
      p.xBound = {
        min: -p.windowWidth * 0,
        max: p.windowWidth * 1,
      };
      p.yBound = {
        min: -p.windowHeight * 0,
        max: p.windowHeight * 1,
      };
    };

    p.draw = () => {
      for (let rep = 1; rep <= 10; rep++) {
        p.fill(p.fillColor);
        p.noStroke();
        p.circle(p.currX, p.currY, 5);

        p.currX += p.dirX;
        p.currY += p.dirY;

        p.seg--;

        if (p.seg <= 0) {
          p.background("rgba(0,0,0,0.75)");
          p.setRandomSeg();
          p.setRandomDirection();
          p.setRandomFillColor();
        }

        if (p.currX <= p.xBound.min) p.currX = p.xBound.max;
        else if (p.currX >= p.xBound.max) p.currX = p.xBound.min;

        if (p.currY <= p.yBound.min) p.currY = p.yBound.max;
        else if (p.currY >= p.yBound.max) p.currY = p.yBound.min;
      }
    };
  };


*/
