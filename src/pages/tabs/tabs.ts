import { User } from './../../models/user';
import { Notification } from './../../models/notification';
import { UserService } from './../../services/userServices';

import { ProfilePage } from './../profile/profile';
import { SearchPage } from './../search/search';
import { NotificationPage } from './../notification/notification';
import { HomePage } from './../home/home';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import firebase from 'firebase';
import { NotificationService } from '../../services/notificationService';

@IonicPage()
@Component({
  selector: 'page-tabs',
  template:
  `
  <ion-tabs>
     <ion-tab [root]='homepage' tabTitle='Home' tabIcon='home'></ion-tab>
     <ion-tab [root]='notificationPage' tabTitle='Notification' tabIcon='notifications'></ion-tab>
     <ion-tab [root]='searchPage' tabTitle='Search' tabIcon='search'></ion-tab>
     <ion-tab [root]='profilePage' tabTitle='My Profile' tabIcon='person'></ion-tab>
  </ion-tabs>
  `,
})
export class TabsPage implements OnInit{
  homepage=HomePage;
  notificationPage=NotificationPage;
  searchPage=SearchPage;
  profilePage=ProfilePage;
  notification:Notification[];
  key;
  user :User;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public Notification : LocalNotifications,
    public notService:NotificationService,
    public userService :UserService) {
     
  }
  
  ngOnInit()
  {
    this.userService.RetriveSpecificUserUser(this.userService.EmailOfloginUser);
    this.user = this.userService.Loggeduser;
    this.notService.FollowNotfication().then(()=>
    {
      this.notification  = this.notService.notList;
   if(this.notification)
   {
    this.notification.forEach((value)=>{
        if(value.userid == this.user.key)
        {
            this.notService.pushNotfication(value.content);
            console.log(value.content);
        }
        else{
            this.notService.pushNotfication('no notfication yet');
            console.log('no new follow');
        }
    });
   }
   else{
       console.log("no not yet")
   }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

 
  
}
