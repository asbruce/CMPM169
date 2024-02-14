// sketch.js - Orange
// Author: Adrian Bruce
// Date: 2/13/2024
//sources/references used: https://p5js.org/examples/3d-orbit-control.html 

let peel;
let stem;
function preload(){
peel=loadImage('https://cdn.pixabay.com/photo/2017/07/20/19/51/citrus-fruit-skin-2523487_640.jpg') //not my image
stem=loadImage('https://images.unsplash.com/photo-1651949468474-283980f5e8b2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); //not my image
}
function setup() {
  createCanvas(710, 400, WEBGL);
}
var peeled = false;
function draw() {
    //below section from ref
  background(250);
  let radius = width * 1.5;
  orbitControl();
  ambientLight(255)
  directionalLight(255, 255, 255, -100, 10, -100);
  directionalLight(255, 255, 255, 0, 10, 0);
  normalMaterial();
  translate(0, 0, -600);
  for (let i = 0; i <= 12; i++) {
    for (let j = 0; j <= 12; j++) {
      push();
      let a = (j / 12) * PI;
      let b = (i / 12) * PI;
      translate(
        sin(2 * a) * radius * sin(b)/4,
        (cos(b) * radius) / 8,
        cos(2 * a) * radius * sin(b)/4
      ); //above section from ref
      //below section mine
      if (j % 1 === 0) {
       fill(255, 160, 50)
        ellipsoid(100-abs(cos(b)*radius)/32, 150+abs(cos(b)*radius)/32, 100-abs(cos(b)*radius)/32);
      }
      pop();//from ref
    }
  }//below section mine
  translate(0, 0, 0);
  fill(250, 240, 240)
  ellipsoid(330, 300, 330)
  texture(peel);
  if(peeled == false){
    ellipsoid (400, 350, 400, 12, 12)
    translate(0, -350, 0);
    texture(stem);
    cylinder(20, 70);
    cylinder(40, 10);
  }
  
}
function keyPressed(){
   if (key == '1') peeled = true;
  if (key== '2') peeled = false;
}