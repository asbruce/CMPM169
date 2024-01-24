// sketch.js - Experiment 2 Vector Art, Animation, and Interactivity - Agate at Night
// Author: Adrian Bruce
// Date: 1/23/2024

//sources/reference used: http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_2_3_01

//other thing i looked at for inspiration (but didn't include code from):http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_0_03

/**
 * MOUSE
 * click               : start a new agate slice
 *
 * KEYS
 * f                   : freeze. loop on/off
 * Delete/Backspace    : clear display
 * s                   : save png
 */
'use strict';
var colorPal = 1; //mine

var formResolution = 5; //i changed this from ref material
var stepSize = 4; //i changed this from ref material
var distortionFactor = 3; //i changed this from ref material
var initRadius = 150;
var centerX;
var centerY;
var x = [];
var y = [];

var filled = false;
var freeze = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // init shape - from ref material
  centerX = width / 2;
  centerY = height / 2;
  var angle = radians(360 / formResolution);
  for (var i = 0; i < formResolution; i++) {
    x.push(cos(angle * i) * initRadius);
    y.push(sin(angle * i) * initRadius);
  }

  background(0); //mine
}

function draw() {

  // calculate new points; based on ref material with modifications from me to make the shape change size
  for (var i = 0; i < formResolution; i++) {
    if(x[i]>0){
      x[i] -= random(-stepSize/2, stepSize);
    }else{
      x[i] += random(-stepSize/2, stepSize);
    }
    if(y[i]>0){
      y[i] -= random(-stepSize/2, stepSize);
    }else{
       y[i] += random(-stepSize/2, stepSize);
    }
  }

    noStroke();
    colorGen();
  
  //beginShape()-endShape() section is from ref material
  beginShape(); 
  // first controlpoint
  curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);

  // only these points are drawn
  for (var i = 0; i < formResolution; i++) {
    curveVertex(x[i] + centerX, y[i] + centerY);
  }
  curveVertex(x[0] + centerX, y[0] + centerY);

  // end controlpoint
  curveVertex(x[1] + centerX, y[1] + centerY);
  endShape();
}
//next function from ref material, except where otherwise specified
function mousePressed() {
  // create agate on mouse position
  centerX = mouseX;
  centerY = mouseY;
  colorPal = random([1, 2, 3]) //mine
  var angle = radians(360 / formResolution);
  var radius = initRadius * random(0.5, 1);
  for (var i = 0; i < formResolution; i++) {
    x[i] = cos(angle * i) * initRadius;
    y[i] = sin(angle * i) * initRadius;
  }
}
//next function is mine. Selects a color palette for the agate slice
function colorGen(){
  switch(colorPal){
    case 1:
      fill(color(random(153,255), random(70,100), random(0, 40), random(0, 255)));
      break;
    case 2:
      fill(color(random(0,50), random(90,190), random(0, 102), random(0, 255)));
      break;
    case 3:
      fill(color(random(0, 40), random(20,200), random(190,255), random(0, 255)));
      break;
  }
}
//next function is from the reference material
function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);

  // pause/play draw loop
  if (key == 'f' || key == 'F') freeze = !freeze;
  if (freeze) {
    noLoop();
  } else {
    loop();
  }
}