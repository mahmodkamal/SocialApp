import { Post } from './../../models/post';
import { User } from './../../models/user';
import { Location } from './../../models/location';
import { UserService } from './../../services/userServices';
import { AuthServices } from './../../services/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user:User; 
  constructor(public navCtrl: NavController,private alertCtrl :AlertController,private loadCtrl:LoadingController, public navParams: NavParams,private authService:AuthServices,private userService :UserService) {
  }

  onSignup(form: NgForm)
  { 
    this.user=new User();
    this.user.age=form.value.age;
    this.user.email=form.value.email;
    this.user.imgUrl="";
    this.user.username=form.value.username;
    this.user.password=form.value.password;
    this.user.location=new Location(0,0);
    console.log(this.user);

    const loading =this.loadCtrl.create({
    content:"siging you up ...",
    });
    loading.present();
    this.authService.signup(form.value.email ,form.value.password)
    .then(data => 
      {
        
        this.userService.AddUser(this.user);
        loading.dismiss();
      }
    )
    .catch(error => 
      {const alert=this.alertCtrl.create({
       title:"failed", 
       message:error.message,
       buttons : 
       [
         {
           text :"OK"
         }
       ]
    });
    alert.present();
  });
  }
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
