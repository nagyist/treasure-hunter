import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as PIXI from 'pixi.js';
//import { Howl } from 'howler';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  private app: any;
  private state: () => void;
  private canvasContainer: HTMLElement;

  constructor(public navCtrl: NavController) {}

  ngAfterViewInit() {
    this.setup();
  }

  // Initialize the game sprites, set the game `state` to `play` and start the 'gameLoop'
  setup() {
    // Get the canvas container HTML element
    this.canvasContainer = document.getElementById('pixi-canvas-container');

    // Create the app 
    this.app = new PIXI.Application(this.getCanvasWidth(), this.getCanvasHeight(), {backgroundColor : 0xA8AC91});

    //Set the game's current state to `play`:
    this.state = this.play;

    // Add the app.view to the HTML document
    this.canvasContainer.appendChild(this.app.view);

    // TITLE SPRITE
    const title = new PIXI.Text("Treasure Hunter", {
      fontSize: 48,
      fill: "#A45D42"
    });
    title.anchor.set(0.5);
    title.x = this.app.renderer.width / 2;
    title.y = this.app.renderer.height / 2 - 200;
    this.app.stage.addChild(title);

    // PIRATE SPRITE
    // create a new Sprite from an image path
    const pirate = PIXI.Sprite.fromImage('assets/images/pirate.png')
    
    // center the sprite's anchor point
    pirate.anchor.set(0.5);

    // Change the sprite's position - move the sprite to the center of the screen
    pirate.x = this.app.renderer.width / 2;
    pirate.y = this.app.renderer.height / 2;;

    //Change the sprite's size
    pirate.width = 160;
    pirate.height = 164;

    //Add the sprite to the stage
    this.app.stage.addChild(pirate);

    // Runs the current game `state` in a loop and render the stage
    let gameLoop = () => {
      // Loop this function 60 times per second
      requestAnimationFrame(gameLoop);

      //Update the current game state:
      this.state();

      // Render the stage
      this.app.renderer.render(this.app.stage);
    }

    //Call the `gameLoop` function once to get it started 
    gameLoop();
  }

  // All the game logic goes here 
  play() {
    console.log('playing...')
  }

  getCanvasWidth() {
    return this.canvasContainer.getBoundingClientRect().width;
  }
  
  getCanvasHeight() {
    return this.canvasContainer.getBoundingClientRect().height;
  }

  adjustCanvasSize(){
    if (this.app != undefined)
      this.app.renderer.resize(this.getCanvasWidth(), this.getCanvasHeight());
  }

}
