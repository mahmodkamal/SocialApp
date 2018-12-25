import { User } from './../../models/user';
import { Notification } from './../../models/notification';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component, OnInit } from '@angular/core';
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

export class NotificationPage implements OnInit {
  notification:Notification[];
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
        if(value.userid === this.user.key)
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
