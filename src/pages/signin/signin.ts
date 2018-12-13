import { User } from './../../models/user';
import { UserService } from './../../services/userServices';
import { NgForm } from '@angular/forms';
import { AuthServices } from './../../services/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  email:string;
  constructor(public navCtrl: NavController,private userService :UserService,private alertCtrl :AlertController,private loadCtrl:LoadingController, public navParams: NavParams,private authService:AuthServices) {
  }

  onSignin(form: NgForm)
  {
    this.email=form.value.email;
    const loading =this.loadCtrl.create({
      content:"siging you in ...",
      });
      loading.present();
      this.authService.signin(form.value.email,form.value.password)
      .then(data => 
        {
          loading.dismiss();
          this.authService.getActiveUser().getIdToken()
          .then((token:string)=>
          {
            this.userService.RetriveUsers(token)
            .subscribe(
              (users :User[])=>
              {
                this.userService.RetriveSpecificUserUser(this.email);
              },
              (error)=>{this.handleError(error.message);}
            )
          }
          )
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
