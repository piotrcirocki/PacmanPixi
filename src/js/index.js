import * as PIXI from 'pixi.js'
import {keyboard} from './keyboard.js';
//Aliases
const Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;

//Create a Pixi Applipacmanion
const app = new Application({ 
    width: 256, 
    height: 256,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
  .add("assets/PacmanFinal.json")
  .load(setup);

//Define any variables that are used in more than one function
let pacman;
function setup() {

//--------keyboard setup beginning

  //Capture the keyboard arrow keys
  const left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      right = keyboard("ArrowRight"),
      down = keyboard("ArrowDown");

  //Left arrow key `press` method
  left.press = () => {
    pacman.textures = sheet.animations["pacmanleft"];
    pacman.play();
    //Change the pacman's velocity when the key is pressed
    pacman.vx = -1;
    pacman.vy = 0;
  };
  
  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the pacman isn't moving vertically:
    //Stop the pacman
    if (!right.isDown && pacman.vy === 0) {
      pacman.vx = -1;
    }
  };

  //Up
  up.press = () => {
    pacman.textures = sheet.animations["pacmanup"];
    pacman.play();
    pacman.vy = -1;
    pacman.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && pacman.vx === 0) {
      pacman.vy = -1;
    }
  };

  //Right
  right.press = () => {
    pacman.textures = sheet.animations["pacmanright"];
    pacman.play();
    pacman.vx = 1;
    pacman.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && pacman.vy === 0) {
      pacman.vx = 1;
    }
  };

  //Down
  down.press = () => {
    pacman.textures = sheet.animations["pacmandown"];
    pacman.play();
    pacman.vy = 1;
    pacman.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && pacman.vx === 0) {
      pacman.vy = 1;
    }
  };

//-------keyboard setup end

  let sheet = PIXI.Loader.shared.resources["assets/PacmanFinal.json"].spritesheet;
  pacman = new PIXI.AnimatedSprite(sheet.animations["pacmanright"]);
  pacman.animationSpeed = 0.167;
  pacman.y = 20;
  pacman.x = 20;
  pacman.vx = 1;
  pacman.vy = 0;
  pacman.play();
  app.stage.addChild(pacman);

 
  //Start the game loop 
  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta) {

  //Update the pacman's velocity
  pacman.x += pacman.vx;
  //Apply the velocity values to the pacman's 
  //position to make it move
  pacman.y += pacman.vy;
}
