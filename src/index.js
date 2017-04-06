document.body.style.margin = '0';
document.body.style.padding = '0';

const p5 = require('p5');

const directionToComponents = direction => {
  if (direction < 0.333333) {
    return { x: 1, y: 0 };
  } else if (direction < 0.66666) {
    return { x: 0, y: 1 };
  } else {
    return { x: 1, y: 1 };
  }
};

const initial = {
  x: 5,
  y: 5,
};

const main = p => {
  const speed = 0.5;
  const points = [
    { initial: Object.assign({}, initial), position: Object.assign({}, initial), direction: 1 },
  ];

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };

  p.draw = () => {
    p.background(255);

    p.stroke(0);

    points.forEach(point => {
      // move point
      const components = directionToComponents(point.direction);
      point.position.x = point.position.x + components.x * speed;
      point.position.y = point.position.y + components.y * speed;

      // paint point
      p.line(point.initial.x, point.initial.y, point.position.x, point.position.y);

      if (Math.random() > 0.995) {
        points.push({
          initial: Object.assign({}, point.position),
          position: Object.assign({}, point.position),
          direction: Math.random(),
        });
      }
    });
  };
};

new p5(main);
