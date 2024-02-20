// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
/**
 * draw tool. shows how to draw with dynamic elements.
 *
 * MOUSE
 * drag                : draw with text
 *
 * KEYS
 * del, backspace      : clear screen
 * arrow up            : font size +
 * arrow down          : font size -
 * 1 Font color red
 * 2 Font color orange
 * 3 Font color yellow
 * 4 Font color green
 * 5 Font color sky blue
 * 6 Font color dark blue
 * 7 Font color purple
 * 8 Font color gray
 * 9 Font color pink
 * 0 Font color black
 */
'use strict';
//variables are from reference material except where specified
var x = 0;
var y = 0;
var stepSize = 5.0;

var font = ['Georgia','Courier', 'Arial', 'cursive']; //mine
var letters = ['BLACK','RED', 'ORANGE', 'YELLOW', 'GREEN', 'SKY', 'BLUE', 'PURPLE', 'GRAY', 'PINK'];//mine
var fontSizeMin = 3;
var textColor = 0;//mine
var fontNum = 0;//mine
var counter = 0;

function setup() { //setup function from reference material
  // use full screen size
  createCanvas(displayWidth, displayHeight);
  background(255);
  cursor(CROSS);
  x = mouseX;
  y = mouseY;

  
  textAlign(LEFT);
  fill(0);
  
  
}

function draw() {
  textFont(font[fontNum]); //mine
  //below from ref with minor modifications
  if (mouseIsPressed && mouseButton == LEFT) {
    var d = dist(x, y, mouseX, mouseY);
    textSize(fontSizeMin + d / 2);
    var newLetter = letters[textColor].charAt(counter);
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY - y, mouseX - x);

      push();
      translate(x, y);
      rotate(angle);
      //above from ref with minor modifications
      //below is mine
      switch(textColor){
        case 0: fill(0);
          break;
        case 1: fill('red');
          break;
        case 2: fill('orange');
          break;
        case 3: fill('yellow');
          break;
        case 4: fill('green');
          break;
        case 5: fill('lightblue');
          break; 
        case 6: fill('blue');
          break;
        case 7: fill('purple');
          break;
        case 8: fill('lightgray');
          break;
        case 9: fill('pink');
          break;
      }//above is mine
      text(newLetter, 0, 0); //from ref
      pop(); //from ref

      counter++;//from ref
      if (counter >= letters[textColor].length){//from ref with modifications
         counter = 0;
        fontNum++;//mine
          if (fontNum>=font.length){//mine
            fontNum=0;//mine
          }
      }
      //below from ref
      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
}

function keyPressed() {//below is mine
  if (keyCode == UP_ARROW) fontSizeMin += 2;
  if (keyCode == DOWN_ARROW && fontSizeMin >2) fontSizeMin -= 2;
  if (key == '0') textColor = 0;
  if (key == '1') textColor = 1;
  if (key == '2') textColor = 2;
  if (key == '3') textColor = 3;
  if (key == '4') textColor = 4;
  if (key == '5') textColor = 5;
  if (key == '6') textColor = 6;
  if (key == '7') textColor = 7;
  if (key == '8') textColor = 8;
  if (key == '9') textColor = 9;
  
}
