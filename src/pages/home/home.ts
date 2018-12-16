import { PostService } from './../../services/postService';
import { UserService } from './../../services/userServices';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { NgForm } from '@angular/forms';
import { Post } from '../../models/post';
import firebase from "firebase";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
 user:User;
 post:Post;
 FollowingUsers =[];
 imagePath="";
  constructor
  (
     public navCtrl: NavController 
    ,private useservice: UserService 
    ,public camera:Camera
    ,public toastCtrl :ToastController
    ,private loadCtrl:LoadingController
    ,private postService:PostService
  )
  {
      this.user=new User();
      this.post=new Post();
  }
  ionViewWillEnter()
  {
    
  }
  ngOnInit()
  {
    const refUsers=firebase.database().ref("Users");
    refUsers.on("value",()=>
    {
     this.useservice.RetriveUsers()
     .then(()=>
      {
        console.log(this.useservice.EmailOfloginUser);
        this.useservice.RetriveSpecificUserUser(this.useservice.EmailOfloginUser);
        this.user=this.useservice.Loggeduser;
        this.user.follow.push(this.user.key)
        console.log(this.user.follow);
        this.FollowingUsers=this.useservice.RerieveFollowedUsers(this.user.follow);
        console.log(this.FollowingUsers);
      }
      );
    })
  }
  Usecamera()
  {
    this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.CAMERA,
      encodingType:this.camera.EncodingType.JPEG,
      correctOrientation:true,
      cameraDirection:this.camera.Direction.BACK,
      quality:50,
      mediaType:this.camera.MediaType.PICTURE,
      })
      .then(imagedata=>{
        this.imagePath= "data:image/jpeg;base64,"+imagedata;
      })
      .catch((error)=>{
        this.toastCtrl.create({
          message:'Error in Capturing Image : '+error,
          duration:3000
        }).present();
      })
  
  }
  UploadImage()
  {
    this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType:this.camera.EncodingType.JPEG,
      correctOrientation:true,
      cameraDirection:this.camera.Direction.BACK,
      quality:50,
      mediaType:this.camera.MediaType.PICTURE,
      })
      .then(imagedata=>{
        this.imagePath= "data:image/jpeg;base64,"+imagedata;
      })
      .catch((error)=>{
        this.toastCtrl.create({
          message:'Error in Capturing Image : '+error,
          duration:3000
        }).present();
      })
  }
   Addpost(form:NgForm)
  {
    const loading = this.loadCtrl.create({
      content:"Posting...",
    });
    loading.present();
    this.post.date=""+new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
    this.post.userid=this.user.key;
    this.post.text=form.value.text;
    this.post.share=[];
    this.post.Like=[];
    if(this.imagePath)
    {
    const ImageRef=firebase.storage().ref("PostsPictures/image-"+new Date().getMilliseconds()+".jpg");
    ImageRef.putString(this.imagePath,firebase.storage.StringFormat.DATA_URL)
    .then((snapshot)=>{
    this.post.imgurl=snapshot.downloadURL;
    this.user.myPosts.push(this.post);
    this.postService.AddPost(this.post,this.user);
    loading.dismiss();
    form.reset();
  })
  .catch(error=>{
    loading.dismiss();
    this.toastCtrl.create({
      message:'Error in saving Image : '+error,
      duration:3000
    }).present();
  });
    }else
    {
      this.user.myPosts.push(this.post);
      this.postService.AddPost(this.post,this.user);
      loading.dismiss();
      form.reset();
    }
  }
  Like(post:Post ,user :User)
  {
    console.log(user);
    console.log(post);
    let index=user.myPosts.indexOf(post);  
    user.myPosts[index].Like.push(this.user.key)
    let followindex=this.FollowingUsers.indexOf(user);  
    this.FollowingUsers[followindex]=user;
    post.Like.push(this.user.key);
    this.postService.Like(post,user);
  }
  disLike(post:Post,user :User)
  {
    console.log(user);
    console.log(post);
    let index=user.myPosts.indexOf(post);  
    user.myPosts[index].Like.push(this.user.key)
    let followindex=this.FollowingUsers.indexOf(user);  
    this.FollowingUsers[followindex]=user;
    post.Like.push(this.user.key);
    this.postService.disLike(post,user);
  }
  share(post:Post,user :User)
  {

  }
  checkuser(key:string, Like :[])
  {
    Like.forEach((like)=>
    {
      if(key===like)
      {
        return true;
      }else
      {
        return false;
      }
    })
  }
}
