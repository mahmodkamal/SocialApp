import { UserService } from './../../services/userServices';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
 user:User;
 users:User[];
  constructor(public navCtrl: NavController ,private useservice: UserService) {

  }
<<<<<<< HEAD
  ionViewWillEnter()
  {
    this.user=this.useservice.Loggeduser;
    this.users=this.useservice.Users;
  }
  ngOnInit()
  {
    
    
=======
  
  ngOnInit()
  {
    this.user=this.useservice.Loggeduser;
    this.users=this.useservice.Users;

>>>>>>> 1d6f589052440d0f2fbcfa79f8bfe9e7bb254c91
    console.log(this.users, this.user);
  }

}
