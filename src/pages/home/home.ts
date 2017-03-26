import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public canvas: HTMLElement;
  private renderer;

  constructor(public navCtrl: NavController) {
    console.log("Component is initialized...");
  }

  ngAfterViewInit() {
    console.log("View is initialized...");
    this.canvas = document.getElementById('pixi-canvas-container');
    this.generatePixiCanvas();
  }

  generatePixiCanvas() {
      //Create the canvas and add it the DOM...
      this.renderer = PIXI.autoDetectRenderer(this.getParentDivHeight(), this.getParentDivWidth());
      this.canvas.appendChild(this.renderer.view);
      this.renderer.autoResize = true;
      //Create a container object called the `stage` and render it...
      var stage = new PIXI.Container();
      this.renderer.render(stage);
  }

  getParentDivHeight() {
    return this.canvas.getBoundingClientRect().width;
  }

  getParentDivWidth() {
    return this.canvas.getBoundingClientRect().height;
  }

  adjustCanvasSize(){
    this.renderer.resize(this.getParentDivWidth(), this.getParentDivHeight());
  }

}
