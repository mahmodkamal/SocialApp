import { User } from './../models/user';
import { Notification } from './../models/notification';

import { UserService } from './userServices';
import { Injectable } from "@angular/core";
import firebase from 'firebase';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Injectable()
export class NotificationService
{
 constructor( public userService :UserService ,public Notfication : LocalNotifications){

 }
 notList:any[];

 public pushNotfication(message)
 {
    this.Notfication.schedule({
        text:message,
        trigger:{at:new Date(new Date().getTime()+3600)},
        led: 'FF0000',
        sound:'file://sound.mp3'
    });
 }
 public FollowNotfication()
 {  
    const personRef= firebase.database().ref('notfication');
    personRef.on('value', function(snapshot) {
        this.notList = snapshot.val();
      });
 } 
 public gitNotList()
 {
     return this.notList.slice();
 }
 
 public pushMynot(user:User)
 {  
    this.FollowNotfication();
   if(this.notList)
   {
    this.notList.forEach((value)=>{
        if(value.userid == user.key)
        {
            this.pushNotfication(user.key+'is now following you');
        }
    });
   }
   else{
       console.log("no not yet")
   }
 }
}