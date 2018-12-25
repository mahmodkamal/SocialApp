import { UserService } from './userServices';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { Post } from "../models/post";
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Notification } from '../models/notification';
@Injectable()
export class PostService
{
    LikeNotfication :Notification;
    DisLikeNotfication :Notification;
    constructor(private toastCtrl:ToastController){}
    public AddPost(post :Post,user :User)
    { 
      if(post.imgurl==null)
      {
        post.imgurl="";  
      }
      const postRef =firebase.database().ref("Posts");
      let key=postRef.push(post).key;
      let index=user.myPosts.indexOf(post);
      user.myPosts[index].postid=key;
      if(key){
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
        console.log(key);
        const updateUserPost= firebase.database().ref('/Users/'+user.key);
        updateUserPost.set(updatedata).then(()=>{this.toastCtrl.create({
        message:'Post has been added',
        duration:3000
       }).present();
       });
       console.log(user);
      }else
      {
         this.toastCtrl.create({
          message:'there are a problem  to add the post',
            duration:3000
         }).present();
      } 
    }
    public Like(post:Post , user:User,key:string)
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
         this.LikeNotfication =new Notification(
            key,
             user.email+'liked your post'+post.text,
            '',
            user.key,
            'Like');
            firebase.database().ref('notfication').push(this.LikeNotfication);
        console.log(user);
    }
    public disLike(post:Post ,user:User,key:string)
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
          message:'you unliked this post',
          duration:3000
           }).present();})
         });
         this.LikeNotfication =new Notification(
            key,
             user.email+'disliked your post'+post.text,
            '',
            user.key,
            'dislike');
            firebase.database().ref('notfication').push(this.LikeNotfication);
        console.log(user);
    }
    public share(post:Post ,user:User)
    {
        console.log(post);
        const updatePost=
        {
            text:post.text,
            imgurl:post.imgurl,
            date :post.date,
            userid:post.userid,
            Like:post.Like,
            share:post.share
        }; 
        const updateshareuser=
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
      const postref=firebase.database().ref("/Posts/"+post.postid);
      postref.set(updatePost).then(()=>
      {
        const userref=firebase.database().ref("/Users/"+user.key);
        userref.set(updateshareuser).then(()=>{this.toastCtrl.create({
            message:'the post have bean shared',
            duration:3000
             }).present();
            })
           });
    }
}