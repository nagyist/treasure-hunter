import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
 
@Injectable()
export class ConnectivityService {
 
  constructor(public platform: Platform, private network: Network){ }

  onDevice(): boolean {
    return this.platform.is('cordova');
  }
 
}
