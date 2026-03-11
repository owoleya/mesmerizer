import p5 from 'p5';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sketch = (p) => {
  let palette;
  let stars = [];
  let maxStars = 500; // Change this to set the total number of stars
  let currentStars = 0;

  p.setup = () => {
    let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    // Target the canvas to render inside the #transition-canvas div
    canvas.parent('transition-canvas');
    p.background(0); // Define the colors from the image
    
    palette = [
      p.color(255, 0, 0),    // Red
      p.color(0, 255, 0),    // Green
      p.color(0, 0, 255),    // Blue
      p.color(255, 255, 0),  // Yellow
      p.color(0, 255, 255),  // Cyan
      p.color(255, 0, 255),  // Magenta
      p.color(128, 0, 255),  // Purple
      p.color(255, 100, 0)   // Orange
    ];
    
    // Pre-calculate star data so they spawn in the exact same deterministic positions
    for (let i = 0; i < maxStars; i++) {
        stars.push({
            x: p.random(p.width),
            y: p.random(p.height),
            color: p.random(palette),
            rotation: p.random(p.TWO_PI) // Pre-calculate rotation
        });
    }
    
    p.noLoop(); // Disable automatic looping

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "max", // Matches 100% of the maximum scrollable distance
      scrub: 0.1,
      onUpdate: (self) => {
        currentStars = Math.floor(self.progress * maxStars);
        p.redraw();
      }
    });
  };

  p.draw = () => {

    p.background(0); // Clear background every redraw so shapes can be "undone"
    p.stroke(0, 0);
    
    // Only draw stars up to current scroll progress
    for(let i = 0; i < currentStars; i++) {
        p.push(); // Save the current transformation state
        p.fill(stars[i].color);
        p.translate(stars[i].x, stars[i].y); // Move the origin to the star's coordinates
        p.rotate(stars[i].rotation); // Rotate the canvas around the new origin
        // Draw the star at (0, 0) since we've already translated to its position
        star(0, 0, window.innerWidth*0.04, window.innerWidth*0.08, 13);
        p.pop(); // Restore the original transformation state
    }
  };

  function star(x, y, radius1, radius2, npoints) {
    let angle = p.TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    p.beginShape();
    for (let a = 0; a < p.TWO_PI; a += angle) {
      let sx = x + p.cos(a) * radius2;
      let sy = y + p.sin(a) * radius2;
      p.vertex(sx, sy);
      sx = x + p.cos(a + halfAngle) * radius1;
      sy = y + p.sin(a + halfAngle) * radius1;
      p.vertex(sx, sy);
    }
    p.endShape(p.CLOSE);
  }
};

new p5(sketch);
