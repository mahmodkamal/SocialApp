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
   req:User;
   loggedUser :User;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public usrService:UserService,
     
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
  follow(i:number)
  {
    this.requestedUser = this.searchedList[i];
    console.log(this.requestedUser);
    if (this.usrService.Loggeduser)
    {
      this.loggedUser = this.usrService.Loggeduser;
      this.requestedUser.followers.push(this.loggedUser.key);
      this.loggedUser.follow.push(this.requestedUser.key);
      this.usrService.follow(this.loggedUser,this.requestedUser);
      console.log('followed');  
    }
    
    
  }

}
