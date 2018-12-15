import { Location } from './../models/location';
import { AuthServices } from './auth';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import firebase from "firebase"
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
@Injectable()
export class UserService
{
  Loggeduser: User;
  Users :User[]=[];
  LoadedUsers :User[]=[];
  EmailOfloginUser :string;
  SearchedList: User[]; 
  userid:string;
  UpdateData;
  hits =[];
  user:User;
  public UserRef:firebase.database.Reference;
  constructor(private http :Http ,private  authService :AuthServices)
  {  
  }
  
  public AddUser(user :User)
  {
    this.Loggeduser=user;  
    const userRef =firebase.database().ref("Users");
    userRef.push(user);
  }

  public RetriveSpecificUserUser(Email: string)
  {
    this.Loggeduser=new User();
    this.Users.forEach((user)=>
    {
     if(user.email===Email)
      {

        this.Loggeduser.age=user.age;
        this.Loggeduser.email=user.email;
        this.Loggeduser.imgUrl=user.imgUrl;
        this.Loggeduser.username=user.username;
        this.Loggeduser.key=user.key;
        this.Loggeduser.location=user.location;
        this.Loggeduser.password=user.password;
        this.Loggeduser.sharedpost=user.sharedpost;
        this.Loggeduser.follow=user.follow;
        this.Loggeduser.followers=user.followers;
        this.Loggeduser.myPosts=user.myPosts;
      }
    });
  }
  

 public  GetUsers(){
     return this.Users.slice();
 }

 public GetHits()
 {
    return this.hits.slice();
 }
 public RetriveUsers()
  {
    const personRef= firebase.database().ref('Users');
    return personRef.once('value', (personSnapshot)=>
    {
       this.Users=this.getUsersArray(personSnapshot);
    })
  }
  getUsersArray(personSnapshot)
  {
    let user:User=new User();
    let users=[];
    personSnapshot.forEach(function(childSnapshot) 
    {
      user.key=childSnapshot.key;
      user.email=childSnapshot.val().email;
      user.age=childSnapshot.val().age;
      user.imgUrl=childSnapshot.val().imgUrl;
      user.location=childSnapshot.val().location;
      user.password=childSnapshot.val().password;
      user.username=childSnapshot.val().username;
      if(childSnapshot.hasChild("sharedpost"))
      {
        user.sharedpost=childSnapshot.val().sharedpost;
      }
      else
      {
       user.sharedpost=[];
      }
      if(childSnapshot.hasChild("followers"))
      {
        user.followers=childSnapshot.val().followers;
      }
      else
      {
       user.followers=[];
      }
      if(childSnapshot.hasChild("follow"))
      {
        user.follow=childSnapshot.val().follow;
      }
      else
      {
       user.follow=[];
      }
      if(childSnapshot.hasChild("myPosts"))
      {
        user.myPosts=childSnapshot.val().myPosts;
      }
      else
      {
       user.myPosts=[];
      }
      users.push(user);
      user= new User();
    });
    return users;    
  }
  public UpdateProfile(user ,token)
  {
    this.UpdateData= {
        email: user.email,
        password: user.password,
        age: user.age,
        profile_picture : user.imgUrl,
        location : user.location
    };
    var updates = {};
    updates['/Users/' + token] =  this.UpdateData;
    return firebase.database().ref().update(updates);
  }

  public Search(query)
  {
    this.UserRef = firebase.database().ref('/Users');
    if (this.Users)
    {
        this.LoadedUsers = this.Users;
        this.initializeItems();
        this.LoadedUsers = this.LoadedUsers.filter((v)=>{
            if (v.email && query)
            {
                if(v.email.toLowerCase().indexOf(query.toLowerCase()) > -1)
                {
                    return true;
                }
                else{
                    return false;
                }
            }
        });
    }
  }
  initializeItems(): void {
    this.SearchedList = this.LoadedUsers;
  }
  public GetSearchedList(){
      return this.SearchedList.slice();
  }
} 
 
