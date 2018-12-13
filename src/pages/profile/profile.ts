import { User } from './../../models/user';
import { Location } from './../../models/location';
import { LocationPage } from './../location/location';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { UserService } from '../../services/userServices';



/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova :any;
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  location : Location = {
		lat:40.7624324,
		lng:-73.9759827
  };
  user:User;
  users:User[];
  locatonIsSet = false;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private modaleCrtl :ModalController,
     private useservice: UserService) {
  }

  ionViewWillEnter()
  {
    this.user=this.useservice.Loggeduser;
    this.users=this.useservice.Users;

    console.log(this.users, this.user);
  }
  onOpenMap(){
  	 
  	const modal = this.modaleCrtl.create(LocationPage,{location : this.location});
  	modal.present();
  	modal.onDidDismiss(
  		data=> {
  			if(data)
  			{
  				this.location = data.location;
  				this.locatonIsSet = true;
  			}
  		}
  	);
  }
  onSubmit(f)
  {
    console.log(f);
  }

}
