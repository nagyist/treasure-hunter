import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as PIXI from 'pixi.js';
import { Howl } from 'howler';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  private renderer;
  private canvasContainer: HTMLElement;
  private soundtrack;

  constructor(public navCtrl: NavController) {}

  ngAfterViewInit() {
    this.canvasContainer = document.getElementById('pixi-canvas-container');
    this.soundtrack = new Howl({
      src: ['assets/sounds/MarimbaBoy.wav', 'assets/sounds/MarimbaBoy.ogg'],
      loop: true,
      volume: 0.5,
    });
    this.soundtrack.pause();
    this.initializeGame();
  }

  initializeGame() {

    //Aliases
    let Container = PIXI.Container,
      autoDetectRenderer = PIXI.autoDetectRenderer,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      Sprite = PIXI.Sprite;

    // Define any variables that are used in more than one function 
    let pirate, soundOn;
    //Set the game's current state to `play`:
    let state = play;

    // Create the renderer 
    this.renderer = autoDetectRenderer(this.getCanvasWidth(), this.getCanvasHeight());

    // Add the canvas to the HTML document
    this.canvasContainer.appendChild(this.renderer.view);

    // Create a container object called the `stage`
    let stage = new Container();

    //  Change the background color of the canvas 
    this.renderer.backgroundColor = 0xA8AC91;

    //Use Pixi's built-in `loader` object to load an image
    loader
      .add("assets/images/pirate.png")
      .add("assets/images/sound-on.png")
      .load(setup);
    
    //This `setup` function will run when the image has loaded
    function setup() {

      //Create the sprite from the texture
      pirate = new Sprite(resources["assets/images/pirate.png"].texture);

      //Change the sprite's position
      pirate.x = 0;
      pirate.y = 0;

      //Change the sprite's size
      pirate.width = 80;
      pirate.height = 82;

      //Initialize the sprites's velocity variables
      pirate.vx = 0;
      pirate.vy = 0;

      //Add the sprite to the stage
      stage.addChild(pirate);

      //Add the sprite to the stage
      stage.addChild(soundOn);

      //Call the `gameLoop` function once to get it started 
      gameLoop();
    }

    // Tell the `renderer` to `render` the `stage`
    let gameLoop = () => {
      // Loop this function 60 times per second
      requestAnimationFrame(gameLoop);

      //Update the current game state:
      state();

      // Render the stage
      this.renderer.render(stage);
    }

    function play() {
      //Update the sprite's velocity
      pirate.vx = 1;
      pirate.vy = 1;
    
      //Apply the velocity values to the sprite's position to make it move
      pirate.x += pirate.vx;
      pirate.y += pirate.vy;
    }

  }

  getCanvasWidth() {
    return this.canvasContainer.getBoundingClientRect().width;
  }
  
  getCanvasHeight() {
    return this.canvasContainer.getBoundingClientRect().height;
  }

  adjustCanvasSize(){
    this.renderer.resize(this.getCanvasWidth(), this.getCanvasHeight());
  }

}
