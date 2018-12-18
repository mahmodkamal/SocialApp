import { Platform } from 'ionic-angular';
import { User } from './../models/user';
import { Notification } from './../models/notification';

import { UserService } from './userServices';
import { Injectable } from "@angular/core";
import firebase from 'firebase';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Injectable()
export class NotificationService
{
 constructor( public userService :UserService ,public Notfication : LocalNotifications,public platform: Platform){

 }
 notList:Notification[];
 Notfications:Notification[];
 notfication :Notification;
 setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/media/hangouts_incoming_call.ogg'
    } else {
      return 'file://assets/sounds/bell.mp3'
    }
  }
 public pushNotfication(message)
 {
    this.platform.ready().then(()=>{
        this.Notfication.schedule({
            text:message,
            trigger:{at:new Date(new Date().getTime()+3600)},
            led: 'FF0000',
            sound:this.setSound()
        });
    })
 }
 public FollowNotfication()
 {  
    const notref =firebase.database().ref('notfication');
    return notref.once("value",(snapshot)=>
    {
      this.notList = this.gitNotList(snapshot);
    })
 } 
 public gitNotList(snapshot)
 {  
 let not:Notification=new Notification('','','','','');
 let notification=[];
 snapshot.forEach(function(childSnapshot) 
 {
   not.id=childSnapshot.key;
   not.postid=childSnapshot.val().postid;
   not.type=childSnapshot.val().type;
   not.userid=childSnapshot.val().userid;
   not.content=childSnapshot.val().content;
   notification.push(not);

 }); 
 return notification; 
 }
 
 public pushMynot(notList, user:User)
 {  
    
 }
}