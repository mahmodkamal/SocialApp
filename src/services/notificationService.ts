
import { UserService } from './userServices';
import { Injectable } from "@angular/core";
import firebase from 'firebase';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Injectable()
export class NotificationService
{
 constructor( public userService :UserService ,public Notfication : LocalNotifications){

 }
 ref :any;

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
    const personRef= firebase.database().ref('Users/followers');
    personRef.on('value', function(snapshot) {
        console.log(snapshot);
      });
 }  
}