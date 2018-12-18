import { Notification } from './../../models/notification';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationService } from '../../services/notificationService';
import { UserService } from '../../services/userServices';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notification:Notification[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public Notification : LocalNotifications,
    public notService:NotificationService,
    public userService :UserService) {
  }
  ionViewWillEnter()
  {
    this.notService.FollowNotfication().then(()=>
    {
      this.notification  = this.notService.notList;
    })
    this.notService.pushMynot(this.notification,this.userService.Loggeduser);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
