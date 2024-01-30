// sketch.js - Lighting Storm
// Author: Adrian Bruce
// Date: 1/29/2024
//sources/references used: https://editor.p5js.org/generative-design/sketches/M_1_5_02

'use strict';

var sketch = function(p) {
    //list of vars from ref material plus additions and modifications from me
  var agents = [];
  var agentCount = 1;
  var noiseScale = 120;
  var noiseStrength = 40;
  var overlayAlpha = 0;
  var agentAlpha = 50;
  var strokeWidth = 1;
  var drawMode = 1;
  var colors = [[255, 255, 255,agentAlpha]];
  var cloudSize = [];
  
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0)
    //from reference material
    for (var i = 0; i < agentCount; i++) {
      agents[i] = new Agent();}
      //next part by me
    for(var i= 0; i<p.windowWidth;i++){
      cloudSize[i]=p.random(20,80);
    }
  };

  p.draw = function() {
    //next part by me
    for(var i=0;i<p.windowWidth/20;i++){
      p.stroke(p.random(0,50), p.random(0,120), p.random(0,200), p.random(5));
      p.line(20*i+p.random(-10, 10), 0, 20*i-30+p.random(-50,50), p.windowHeight)
      p.noStroke();
      p.fill(p.random(20,200), 10);
      p.ellipse((i*20+5), p.random(15), cloudSize[i], cloudSize[i]);
      p.ellipse((i*20+5), p.windowHeight-p.random(15), cloudSize[i], cloudSize[i]);
    }
    //next part by me
    for(var i=0;i<p.windowHeight/20;i++){
      p.noStroke();
      p.fill(p.random(20,200), 10);
      p.ellipse(p.random(-5,5), (i*20+5), cloudSize[i], cloudSize[i]);
      p.ellipse(p.windowWidth+p.random(5, -5), (i*20+5), cloudSize[i], cloudSize[i]);
    }
    p.fill(255, overlayAlpha);//reference material
    p.noStroke();//reference material
    p.rect(0, 0, p.width, p.height);//reference material

    //this part is from the reference material with some modifications by me
    for (var i = 0; i < agentCount; i++) {
      p.stroke(colors[i][0], colors[i][1], colors[i][2], colors[i][3]);
      agents[i].update1(noiseScale, noiseStrength, strokeWidth[i]);
    }
    //this part is by me
    if(strokeWidth>0.2)strokeWidth+=p.random(-0.5,0.5);
    else strokeWidth+=p.random(0.5);
  };
//function below is from the reference material
  p.keyReleased = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == '1') drawMode = 1;
    if (p.key == ' ') {
      var newNoiseSeed = p.floor(p.random(10000));
      p.noiseSeed(newNoiseSeed);
    }
    if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(0);
  };
};
//the following functions are from the reference material
var myp5 = new p5(sketch);
var Agent = function() {
    this.vector = myp5.createVector(myp5.random(myp5.width), myp5.random(myp5.height));
    this.vectorOld = this.vector.copy();
    this.stepSize = myp5.random(2, 5);
    this.isOutside = false;
    this.angle;
  };
  
  Agent.prototype.update = function(strokeWidth) {
    this.vector.x += myp5.cos(this.angle) * this.stepSize;
    this.vector.y += myp5.sin(this.angle) * this.stepSize;
    this.isOutside = this.vector.x < 0 || this.vector.x > myp5.width || this.vector.y < 0 || this.vector.y > myp5.height;
    if (this.isOutside) {
      this.vector.set(myp5.random(myp5.width), myp5.random(myp5.height));
      this.vectorOld = this.vector.copy();
    }
    myp5.strokeWeight(strokeWidth * this.stepSize);
    myp5.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);
    this.vectorOld = this.vector.copy();
    this.isOutside = false;
  };
  
  Agent.prototype.update1 = function(noiseScale, noiseStrength, strokeWidth) {
    this.angle = myp5.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;
    this.update(strokeWidth);
  };
