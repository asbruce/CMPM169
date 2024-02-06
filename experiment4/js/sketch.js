
// sketch.js - Sound Painting
// Author: Adrian Bruce
// Date: 2/5/2024
//sources/references used: https://p5js.org/examples/sound-mic-threshold.html, http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_1_1_01

'use strict'

let audInput;
let analyzer;
let gridX = 0;
let gridY = 0;
let ready = false;
let lastVolume=0;

function setup() {//from ref with modifications
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(userStartAudio());
  background(255);
  noStroke();
  colorMode(HSB);
  // Create an Audio audInput
  audInput = new p5.AudioIn();
  
  audInput.start();
}

function draw() {
  // Get the overall volume (between 0 and 1.0)
  let loudness = audInput.getLevel();

  // If the volume > 0.1,  a rect is drawn at a random location.
  // The louder the volume, the larger the rectangle.
  let minnoise = 0.1;
  let stepX = 50;
  let stepY = 50;
  //below section is mine, with a few lines that were modified from the reference material
  if (loudness > minnoise && !ready){
    lastVolume= loudness*100;
    ready = true;
  }else if (loudness > minnoise && ready) {
    stepX=10*loudness;
    stepY=10;
    fill(loudness*360, lastVolume, 100);
    circle(gridX, gridY, 10+(10*stepX-lastVolume));
    gridX+=stepX;
    if(gridX>=width){
      gridX=0;
      gridY+=stepY;
      ready = false;
    }
    
  }else if(loudness<minnoise){
    
  }
//below section is from the example
  // Graph the overall potential volume, w/ a line at the threshold
  let y = map(loudness, 0, 1, height, 0);
  let ythreshold = map(minnoise, 0, 1, height, 0);

  noStroke();
  fill(175);
  rect(0, 0, 20, height);
  // Then draw a rectangle on the graph, sized according to volume
  fill(0);
  rect(0, y, 20, y);
  line(0, ythreshold, 19, ythreshold);
}