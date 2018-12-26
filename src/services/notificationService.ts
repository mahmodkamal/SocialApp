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
 lastNotfication:Notification;
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
 public KeepUpdtedNotfications()
 {
   const notref = firebase.database().ref('notfication');
   return notref.on("child_added",(lastNot)=>{
    this.lastNotfication.content = lastNot.val().content;
    this.lastNotfication.id = lastNot.val().id;
    this.lastNotfication.postid =lastNot.val().postid;
    this.lastNotfication.userid = lastNot.val().userid;

   })
 }


 snapToArray(snap){
   let returnarr=[]
    snap.forEach(element => {
      let item=element.val();
      item.id=element.key;
      returnarr.push(item);
    });
    return returnarr;
  }
 public gitNotList(snapshot)
 {  
 let not:Notification=new Notification('','','','','');
 let notification :Notification[]=[];
 snapshot.forEach(function(childSnapshot) 
 { 
   console.log(childSnapshot);
   not.id=childSnapshot.key;
   not.postid=childSnapshot.val().postid;
   not.type=childSnapshot.val().type;
   not.userid=childSnapshot.val().userid;
   not.content=childSnapshot.val().content;
   console.log(not);
   notification.push(not);
   not=new Notification('','','','','');

 }); 
 console.log(notification);
 return notification; 
 }
 
 public gitlastNot(lastnot)
 {  
 let not:Notification=new Notification('','','','','');
 lastnot.forEach(function(childSnapshot) 
 {
   not.id=childSnapshot.key;
   not.postid=childSnapshot.val().postid;
   not.type=childSnapshot.val().type;
   not.userid=childSnapshot.val().userid;
   not.content=childSnapshot.val().content;
  
 

 }); 
 return not; 
 }
 public pushMynot(notList, user:User)
 {  
    
 }
}