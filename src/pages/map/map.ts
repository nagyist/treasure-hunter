import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
//import { ConnectivityService } from '../../providers/connectivity-service';

declare var google;

interface Coordinates {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  private map: any;
  private treasureCoordinates: Coordinates = {latitude: 34.343434, longitude: 24.234341};
  private myCoordinates: Coordinates;

  constructor(public navCtrl: NavController,  private alertCtrl: AlertController, private platform: Platform, private geolocation: Geolocation) { }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.initializeMap()
    });
  }

  initializeMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.myCoordinates = {latitude: resp.coords.latitude, longitude: resp.coords.longitude}

      let myPosition = new google.maps.LatLng(this.myCoordinates.latitude, this.myCoordinates.longitude);
      let treasurePosition = new google.maps.LatLng(this.treasureCoordinates.latitude, this.treasureCoordinates.longitude);

      let options = {
        center: myPosition,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, options);

      var myMarker = new google.maps.Marker({
        position: myPosition,
        map: this.map,
        title: 'My Position'
      });

      var treasureMarker = new google.maps.Marker({
        position:  treasurePosition,
        map: this.map,
        title: 'Treasure'
      });

      myMarker.setMap(this.map);
      treasureMarker.setMap(this.map);

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
    });
  }

}
