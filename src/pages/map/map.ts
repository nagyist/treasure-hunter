import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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
  private playerMarker: any;
  private treasureMarker: any;
  private playerCoordinates: Coordinates;
  private treasureCoordinates: Coordinates = {latitude: 37.8243009, longitude: 20.7909324};

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private platform: Platform, private geolocation: Geolocation) { }

  ngAfterViewInit() {
    // Returns a promise when the platform is ready and native functionality can be called.
    this.platform.ready().then(() => {
      this.initializeMap();
    });
  }

  initializeMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.playerCoordinates = {latitude: resp.coords.latitude, longitude: resp.coords.longitude}

      let playerPosition = new google.maps.LatLng(this.playerCoordinates.latitude, this.playerCoordinates.longitude);
      let treasurePosition = new google.maps.LatLng(this.treasureCoordinates.latitude, this.treasureCoordinates.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement);
      this.map.setCenter(playerPosition);
      this.map.setZoom(12);
      this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      this.map.setOptions({
        styles: [{"featureType":"all","elementType":"all","stylers":[{"color":"#d4b78f"},{"visibility":"on"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#0d0000"},{"visibility":"on"},{"weight":1}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#98290e"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#98290e"},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#d4b78f"},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#c4b17e"},{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#0d0000"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#d9be94"},{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#0d0000"},{"visibility":"off"},{"weight":2}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a8ac91"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#98290e"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]}],
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: true,
        zoomControl: true,
      });

      this.playerMarker = new google.maps.Marker();
      this.playerMarker.setMap(this.map);
      this.playerMarker.setPosition(playerPosition);
      this.playerMarker.setIcon('assets/images/playerMarker.png');

      this.treasureMarker = new google.maps.Marker();
      this.treasureMarker.setMap(this.map);
      this.treasureMarker.setPosition(treasurePosition);
      this.treasureMarker.setIcon('assets/images/treasureMarker.png');

    }).catch((error) => {
      console.log('Error getting location', error);
      let alert = this.alertCtrl.create({
        title: 'Mo Location Found',
        subTitle: 'App is not able to access your location.',
        buttons: ['OK']
      });
      alert.present();
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      if (data.coords.latitude != this.playerCoordinates.latitude || data.coords.latitude != this.playerCoordinates.longitude) {
        let newPosition = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
        this.playerMarker.setPosition(newPosition);
        //this.map.setCenter(newPosition);
        this.playerCoordinates.latitude = data.coords.latitude;
        this.playerCoordinates.longitude = data.coords.longitude;
      }
    });
  }

}
