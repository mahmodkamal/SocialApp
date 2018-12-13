import { Location } from './../../models/location';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  location: Location;
  marker : Location;
  locatonIsSet = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCrtl :ViewController) {
  }
  ionViewWillEnter()
  {
  	  	this.location = this.navParams.get('location');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetLocationPage');
  }
  onSetMarker(event :any)
  {
  	console.log(event);
  	this.marker = new Location(event.coords.lat , event.coords.lng);
  }
  onConfirm()
  {
  	this.viewCrtl.dismiss({location:this.marker});
  }
  onAbort()
  {
  	this.viewCrtl.dismiss();
  }
}
