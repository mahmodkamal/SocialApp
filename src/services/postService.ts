import { ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { Post } from "../models/post";
import { Injectable } from '@angular/core';
@Injectable()
export class PostService
{
    constructor(private toastCtrl:ToastController){}
    public AddPost(post :Post)
    { 
      const postRef =firebase.database().ref("Posts");
      postRef.push(post).then(()=>
      {
        this.toastCtrl.create({
            message:'Post Has bean added',
            duration:3000
          }).present();
      })
    } 
}