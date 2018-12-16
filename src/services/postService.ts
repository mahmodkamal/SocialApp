import { ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { Post } from "../models/post";
import { Injectable } from '@angular/core';
import { User } from '../models/user';
@Injectable()
export class PostService
{
    constructor(private toastCtrl:ToastController){}
    public AddPost(post :Post,user :User)
    { 
        const updatedata=
        {
            email:user.email, 
            password :user.password,
            age :user.age,
            imgUrl:user.imgUrl,
            location :user.location,
            username :user.username,
            sharedpost: user.sharedpost,
            followers :user.followers,
            myPosts:user.myPosts,
            follow:user.follow
        };  
      const postRef =firebase.database().ref("Posts");
      postRef.push(post).then(()=>
      {
        const updateUserPost= firebase.database().ref('/Users/'+user.key);
        updateUserPost.set(updatedata).then(()=>{this.toastCtrl.create({
        message:'Post has been added',
        duration:3000
      }).present();})
      });
      console.log(user);

    } 
    public Like(post:Post , user:User)
    {
        const updateuser=
        {
            email:user.email, 
            password :user.password,
            age :user.age,
            imgUrl:user.imgUrl,
            location :user.location,
            username :user.username,
            sharedpost: user.sharedpost,
            followers :user.followers,
            myPosts:user.myPosts,
            follow:user.follow
        }; 
        const updatePost=
        {
            text:post.text,
            imgurl:post.imgurl,
            date :post.date,
            userid:post.userid,
            Like:post.Like,
            share:post.share
        }; 
        const postRef =firebase.database().ref("/Posts/"+post.postid);
        postRef.set(updatePost).then(()=>
        {
          const updateUserPost= firebase.database().ref('/Users/'+user.key);
          updateUserPost.set(updateuser).then(()=>{this.toastCtrl.create({
          message:'you liked this post',
          duration:3000
           }).present();})
         });
        console.log(user);
    }
    public disLike(post:Post ,user:User)
    {
        const updateuser=
        {
            email:user.email, 
            password :user.password,
            age :user.age,
            imgUrl:user.imgUrl,
            location :user.location,
            username :user.username,
            sharedpost: user.sharedpost,
            followers :user.followers,
            myPosts:user.myPosts,
            follow:user.follow
        }; 
        const updatePost=
        {
            text:post.text,
            imgurl:post.imgurl,
            date :post.date,
            userid:post.userid,
            Like:post.Like,
            share:post.share
        }; 
        const postRef =firebase.database().ref("/Posts/"+post.postid);
        postRef.set(updatePost).then(()=>
        {
          const updateUserPost= firebase.database().ref('/Users/'+user.key);
          updateUserPost.set(updateuser).then(()=>{this.toastCtrl.create({
          message:'you liked this post',
          duration:3000
           }).present();})
         });
        console.log(user);
    }
    public share(post:Post ,user:User,shareduser :User)
    {

    }
}