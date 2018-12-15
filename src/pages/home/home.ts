import { PostService } from './../../services/postService';
import { UserService } from './../../services/userServices';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, DateTime } from 'ionic-angular';
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
    
    this.useservice.RetriveUsers()
    .then(()=>
      {
        console.log(this.useservice.EmailOfloginUser);
        this.useservice.RetriveSpecificUserUser(this.useservice.EmailOfloginUser);
        this.user=this.useservice.Loggeduser;
      }
    );
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
    const ImageRef=firebase.storage().ref("Images/image-"+new Date().getMilliseconds()+".jpg");
    ImageRef.putString(this.imagePath,firebase.storage.StringFormat.DATA_URL)
    .then((snapshot)=>{
    this.post.imgurl=snapshot.downloadURL;
    this.postService.AddPost(this.post);
    this.user.myPosts.push(this.post);
    loading.dismiss();
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
      this.postService.AddPost(this.post);
      this.user.myPosts.push(this.post);
      loading.dismiss();
    }
  }
}
