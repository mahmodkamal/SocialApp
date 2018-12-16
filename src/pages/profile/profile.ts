import { AuthServices } from './../../services/auth';
import { Camera } from '@ionic-native/camera';
import { NgForm } from '@angular/forms';
import { User } from './../../models/user';
import { Location } from './../../models/location';
import { LocationPage } from './../location/location';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/userServices';
import firebase from "firebase";



/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova :any;
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  location : Location = {
		lat:40.7624324,
		lng:-73.9759827
  };
  user:User;
  users:User[];
  locatonIsSet = false;
  imagePath="";
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private modaleCrtl :ModalController,
     private useservice: UserService,
     public camera:Camera,
     public toastCtrl :ToastController,
     public authService :AuthServices,
     public loading :LoadingController
     ) {
      this.useservice.RetriveSpecificUserUser(this.useservice.EmailOfloginUser);
      this.user = this.useservice.Loggeduser;
  }

  ionViewWillEnter()
  {
   
  }
  onOpenMap(){
  	 
  	const modal = this.modaleCrtl.create(LocationPage,{location : this.location});
  	modal.present();
  	modal.onDidDismiss(
  		data=> {
  			if(data)
  			{
  				this.location = data.location;
  				this.locatonIsSet = true;
  			}
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
  
  editProfile(f :NgForm)
  {
    const loading = this.loading.create({
      content:"Updating...",
    });
    loading.present();
    this.useservice.RetriveSpecificUserUser(this.useservice.EmailOfloginUser);
    this.user.age=f.value.age;
    this.user.email = f.value.email;
    this.user.location = this.location;
    if(this.imagePath)
    {
    const ImageRef=firebase.storage().ref("PostsPictures/image-"+new Date().getMilliseconds()+".jpg");
    ImageRef.putString(this.imagePath,firebase.storage.StringFormat.DATA_URL)
    .then((snapshot)=>{
    this.user.imgUrl=snapshot.downloadURL;
    this.useservice.UpdateProfile(this.user,this.useservice.Loggeduser.key);
    loading.dismiss();
    f.reset();
  })
  .catch(error=>{
    loading.dismiss();
    this.toastCtrl.create({
      message:'Error in saving Image : '+error,
      duration:3000
    }).present();
  });
  
   
    console.log(f);
  }
  }
}
