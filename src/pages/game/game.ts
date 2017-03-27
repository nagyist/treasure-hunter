import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  private app;
  private canvas: HTMLElement;

  constructor(public navCtrl: NavController) {}

  ngAfterViewInit() {
    this.canvas = document.getElementById('pixi-canvas-container');
    this.initializeApp();
  }

  initializeApp() {
    // create a new app
    this.app = new PIXI.Application(this.getCanvasWidth(), this.getCanvasHeight(), {backgroundColor : 0xA8AC91});
    this.canvas.appendChild(this.app.view);
  }

  getCanvasWidth() {
    return this.canvas.getBoundingClientRect().width;
  }
  
  getCanvasHeight() {
    return this.canvas.getBoundingClientRect().height;
  }

  adjustCanvasSize(){
    this.app.renderer.resize(this.getCanvasWidth(), this.getCanvasHeight());
  }

}
