import { PostService } from './../../services/postService';
import { UserService } from './../../services/userServices';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { NgForm } from '@angular/forms';
import { Post } from '../../models/post';
import firebase from "firebase";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {
 user:User;
 post:Post;
 FollowingUsers =[];
 imagePath="";
 selctedPost="Follow"
  constructor
  (
     public navCtrl: NavController ,
     public navParams :NavParams
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
 /* ngOnInit()
  {
     this.useservice.RetriveUsers()
     .then(()=>
      {
        console.log(this.useservice.EmailOfloginUser);
        this.useservice.RetriveSpecificUserUser(this.useservice.EmailOfloginUser);
        this.user=this.useservice.Loggeduser;
        this.FollowingUsers=this.useservice.RerieveFollowedUsers(this.user.follow);
        console.log(this.FollowingUsers);
      }
      );
  }*/
  ionViewDidEnter()
  {
    console.log("home page");
    this.useservice.RetriveUsers()
     .then(()=>
      {
        console.log(this.useservice.EmailOfloginUser);
        this.useservice.RetriveSpecificUserUser(this.useservice.EmailOfloginUser);
        this.user=this.useservice.Loggeduser;
        this.FollowingUsers=this.useservice.RerieveFollowedUsers(this.user.follow);
        console.log(this.FollowingUsers);
      }
      );
  }
  show(type :string)
  {
    this.selctedPost=type;
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
    ImageRef.getDownloadURL().then((url)=>
    {
      this.post.imgurl=url;
      console.log(this.post.imgurl);
      this.user.myPosts.push(this.post);
      this.postService.AddPost(this.post,this.user);
    });
    
    
    this.imagePath="";
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
  Like(post:Post ,user:User,posttype:string)
  {
    post.Like.push(this.user.key);
    
    if(posttype==="my" || posttype==="follow" )
    {
      let index=user.myPosts.indexOf(post);
      user.myPosts[index]=post;
      user.myPosts[index]=post;
    }
    else 
    {
      let index=user.sharedpost.indexOf(post);
      user.sharedpost[index]=post;
      user.sharedpost[index]=post;
    }
    let followindex=this.FollowingUsers.indexOf(user);  
    this.FollowingUsers[followindex]=user;  
    this.postService.Like(post,user,this.user.key);
  }
  disLike(post:Post,user :User,posttype:string)
  {
    console.log(user);
    console.log(post);
    let postindex=post.Like.indexOf(this.user.key);
    post.Like.splice(postindex,1);
   
    if(posttype==="follow"|| posttype==="my" )
    {
      let index=user.myPosts.indexOf(post);
      user.myPosts[index]=post;
    }
    else 
    {
      let index=user.sharedpost.indexOf(post);
      user.sharedpost[index]=post;
    }
    let followindex=this.FollowingUsers.indexOf(user);  
    this.FollowingUsers[followindex]=user;
    this.postService.disLike(post,user,this.user.key);
  }
  share(post:Post)
  {
    post.share.push(this.user.key);
    this.user.sharedpost.push(post);
    this.postService.share(post,this.user);
  }
  checkuser(key:string, Like :string[])
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
    });
  }
  
}
