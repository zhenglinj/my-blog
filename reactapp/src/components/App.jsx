import React, { Component } from 'react';

class Rose extends Component {
  constructor(props) {
    super(props);
    this.context = null;
    this.canvas = null;
  }

  componentDidMount() {
    this.canvas = document.getElementById(this.props.id);
    this.context = this.canvas.getContext('2d');

    let zBuffer = [];

    let size = this.props.size;
    this.canvas.width = this.canvas.height = size;
    let h = - size / 2;

    function surface(a, b, c) {
      if (c > 60) {
        // The rose STICK.
        // There is only one value greater than 60, which is 60.8108108108.
        return {
          x: Math.sin(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) - Math.sin(b) * 50,
          y: b * size + 50,
          z: 625 + Math.cos(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) + b * 400,
          r: a * 1 - b / 2,
          g: a
        };
      }

      // a and b have values in the interval [0, 1)
      // A and B have values in the interval [-1, +1)
      let A = a * 2 - 1;
      let B = b * 2 - 1;

      if (A * A + B * B < 1) {
        // Consider only points inside a [to-be-deformed] circle.

        if (c > 37) {
          // The 2 LEAVES.
          // There are 17 values for which 37 < c <= 60, but only 2 leaves are drawn.
          // The value of c is not used to draw the leaves - only its parity is used.
          /*
           * The left leaf (when c is even) is drawn 8 times, while the right
           * leaf (when c is odd) is drawn 9 times. This is due to the deformation
           * that makes the tips of the leaves to take more iterations to render.
           * So, with more rendering per iteration, the leaves will be filled
           * more or less at the same time as the rest of the rose.
           */
          let j = c & 1;   // Is c odd or even?
          let n = j ? 6 : 4;
          let o = .5 / (a + .01) + Math.cos(b * 125) * 3 - a * 300;
          let w = b * h;
          return {
            x: o * Math.cos(n) + w * Math.sin(n) + j * 610 - 390,
            y: o * Math.sin(n) - w * Math.cos(n) + 550 - j * 350,
            z: 1180 + Math.cos(B + A) * 99 - j * 300,
            r: .4 - a * .1 + Math.pow(1 - B * B, -h * 6) * .15 - a * b * .4 + Math.cos(a + b) / 5 + Math.pow(Math.cos((o * (a + 1) + (B > 0 ? w : -w)) / 25), 30) * .1 * (1 - B * B),
            g: o / 1e3 + .7 - o * w * 3e-6
          };
        }

        if (c > 32) {
          // The 4 SEPALS.
          // There are 4 values for which 32 < c <= 37, one for each sepal.
          c = c * 1.16 - .15;
          let o = a * 45 - 20;
          let w = b * b * h;
          let z = o * Math.sin(c) + w * Math.cos(c) + 620;
          return {
            x: o * Math.cos(c) - w * Math.sin(c),
            y: 28 + Math.cos(B * .5) * 99 - b * b * b * 60 - z / 2 - h,
            z: z,
            r: (b * b * .3 + Math.pow((1 - (A * A)), 7) * .15 + .3) * b,
            g: b * .7
          };
        }

        // The 24 PETALS.
        // There are 24 values for which c <= 32, one for each petal.
        let o = A * (2 - b) * (80 - c * 2);
        let w = 99 - Math.cos(A) * 120 - Math.cos(b) * (-h - c * 4.9) + Math.cos(Math.pow(1 - b, 7)) * 50 + c * 2;
        let z = o * Math.sin(c) + w * Math.cos(c) + 700;
        return {
          x: o * Math.cos(c) - w * Math.sin(c),
          y: B * 99 - Math.cos(Math.pow(b, 7)) * 50 - c / 3 - z / 1.35 + 450,
          z: z,
          r: (1 - b / 1.2) * .9 + a * .1,
          g: Math.pow((1 - b), 20) / 4 + .05
        };
      }
    }

    setInterval(function (context) {
      for (let i = 0; i < 10000; i++) {
        // Splits i in intervals [0, 45) ...
        let part = i % 46;
        // .. and stretches each interval to [0, 62.1621621622).
        let c = part / .74;
        // See the table in the end of this file.

        let point = surface(Math.random(), Math.random(), c);
        if (point) {
          let z = point.z;
          let x = parseInt(point.x * size / z - h);
          let y = parseInt(point.y * size / z - h);
          let zBufferIndex = y * size + x;
          if ((typeof zBuffer[zBufferIndex] === "undefined") || (zBuffer[zBufferIndex] > z)) {
            zBuffer[zBufferIndex] = z;
            /*
            The rose is mostly red and green - that's why the objects
            returned by the surface function do not have a field for the
            blue component. However, a bit of the blue component is desired
            to "tune" the colors of the petals, so the blue component can be
            derived from the red component.
             */
            let r = -parseInt(point.r * h);
            let g = -parseInt(point.g * h);
            let b = -parseInt(point.r * point.r * -80);

            context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            context.fillRect(x, y, 1, 1);
          }
        }
      }
    }, 0, this.context);
  }

  render() {
    return (
      <canvas id={this.props.id}></canvas>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Rose id='a' size={500} />
        <Rose id='b' size={400} />
      </div>
    );
  }
}

export default App;
