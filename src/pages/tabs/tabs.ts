import { ProfilePage } from './../profile/profile';
import { SearchPage } from './../search/search';
import { NotificationPage } from './../notification/notification';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
export class TabsPage {
  homepage=HomePage;
  notificationPage=NotificationPage;
  searchPage=SearchPage;
  profilePage=ProfilePage;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public localNotifications :LocalNotifications) {
  }
  ionViewWillEnter()
  {
  	  this.localNotifications.schedule({
  	  	text:'',
  	  	trigger:{at:new Date(new Date().getTime()+3600)},
  	  	led: 'FF0000',
  	  	sound:'file://sound.mp3'
  	  });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

 
  
}
