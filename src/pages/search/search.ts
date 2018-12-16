import { User } from './../../models/user';
import { NotificationService } from './../../services/notificationService';
import { UserService } from './../../services/userServices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
   searchedList :any[];
   result =false;
   requestedUser:User;
   loggedUser :User;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public usrService:UserService,
     public NotificationService : NotificationService
     ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  search(f :NgForm){
    this.usrService.Search(f.value.search);
    this.searchedList =this.usrService.GetSearchedList();
    this.result = true;
    console.log(f);
  }
  follow(i)
  {
    this.requestedUser= this.searchedList.find(i);
    if (this.usrService.Loggeduser)
    {
      this.loggedUser = this.usrService.Loggeduser;
      this.usrService.follow(this.loggedUser,this.requestedUser);
    }
  }

}
