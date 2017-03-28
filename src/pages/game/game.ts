import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as PIXI from 'pixi.js';
import { Howl } from 'howler';

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
    // Get the canvas container HTML element
    this.canvasContainer = document.getElementById('pixi-canvas-container');

    // Create the app 
    this.app = new PIXI.Application(this.getCanvasWidth(), this.getCanvasHeight(), {backgroundColor : 0xA8AC91});

    // Add the app.view to the HTML document
    this.canvasContainer.appendChild(this.app.view);

    //Set the game's current state to `play`:
    this.state = this.play;

    // TITLE
    var style = new PIXI.TextStyle({
        fontFamily: 'Times New Roman',
        fontSize: 42,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fill: ['#ffffff', '#A45D42'], // gradient
        stroke: '#A3A78D',
        strokeThickness: 4,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 2,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });
    const title = new PIXI.Text('Treasure Hunter', style);
    title.anchor.set(0.5);
    title.x = this.app.renderer.width / 2;
    title.y = this.app.renderer.height / 2 - 200;
    this.app.stage.addChild(title);

    // PIRATE
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

    // Tell the `renderer` to `render` the `stage`
    var gameLoop = () => {
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
