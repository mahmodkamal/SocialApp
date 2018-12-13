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
  ionViewWillEnter()
  {
    this.user=this.useservice.Loggeduser;
    this.users=this.useservice.Users;
  }
    
  
  ngOnInit()
  {
    this.user=this.useservice.Loggeduser;
    this.users=this.useservice.Users;

    console.log(this.users, this.user);
  }

}
