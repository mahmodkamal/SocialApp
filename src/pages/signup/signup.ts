import { User } from './../../models/user';
<<<<<<< HEAD
import { Location } from './../../models/location';
=======
>>>>>>> 1d6f589052440d0f2fbcfa79f8bfe9e7bb254c91
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
<<<<<<< HEAD
    this.user=new User(form.value.email,form.value.password,form.value.age,"",new Location(0,0),form.value.username);
=======
    this.user=new User(form.value.email,form.value.password,form.value.age,"",null,form.value.username);
>>>>>>> 1d6f589052440d0f2fbcfa79f8bfe9e7bb254c91
    console.log(this.user);

    const loading =this.loadCtrl.create({
    content:"siging you up ...",
    });
    loading.present();
    this.authService.signup(form.value.email ,form.value.password)
    .then(data => 
     this.authService.getActiveUser().getIdToken()
      .then((token: string)=>
        {
          loading.dismiss();
          this.userService.AddUser(this.user,token).subscribe(
            date=>
            {
              
              //console.log(data)
            },
            (error)=>{this.handleError(error.message);}
          );  
        })
    
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
