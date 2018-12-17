import { Location } from './../models/location';
import { AuthServices } from './auth';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import firebase from "firebase"
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Post } from '../models/post';

@Injectable()
export class UserService
{
  Loggeduser: User;
  Users :User[]=[];
  LoadedUsers :User[]=[];
  LodedList:User[]=[];
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
    this.EmailOfloginUser=user.email;
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
        //this.Loggeduser.imgUrl="../../assets/imgs/43101510_1856077347812593_1432479448434737152_n.jpg";
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
 public RerieveFollowedUsers(follow :string[])
 {
   let users=[];  
   console.log(follow);
   this.Users.forEach((user)=>
   {
    for(let followuser of follow)
    {
     if(user.key === followuser)
     {
      users.push(user);
      console.log(user);
     }
    } 
    
   });
   console.log(users);
   return users;
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
      //user.imgUrl="../../assets/imgs/43101510_1856077347812593_1432479448434737152_n.jpg";
      user.location=childSnapshot.val().location;
      user.password=childSnapshot.val().password;
      user.username=childSnapshot.val().username;
      if(childSnapshot.hasChild("sharedpost"))
      {
        user.sharedpost=childSnapshot.val().sharedpost;
        user.sharedpost.forEach((post)=>
        {
          if(post.Like==null)
          {
            post.Like=[];    
          }
          if(post.share==null)
          {
            post.share=[];    
          }
          if(post.imgurl==null)
          {
            post.imgurl="";    
          }
        });
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
        user.myPosts.forEach((post)=>
        {
          if(post.Like==null)
          {
            post.Like=[];    
          }
          if(post.share==null)
          {
            post.share=[];    
          }
          if(post.imgurl==null)
          {
            post.imgurl="";    
          }
        });
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
        age      : user.age,
        imgUrl   : user.imgUrl,
        location : user.location,
        email    : user.email,
        myPosts  : user.myPosts,
        password : user.password,
        username : user.username
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
        
        this.initializeItems();
        this.LoadedUsers = this.Users.filter((v)=>{
            if (v.email && query)
            {
                if(v.email === query)
                {
                    return 1;
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
  public follow (folowUser :User,folower)
  {
      if(this.Loggeduser)
      {
        this.Loggeduser.follow.push(folower.key);
        folower.followers.push(folowUser.key);
        firebase.database().ref('users/follow').set({
          follow: folower.key
        });
        firebase.database().ref('users/followers').set({
          followers: this.Loggeduser.key
        });
        firebase.database().ref('notfication').set({
            content:'follow Notfication from '+ this.Loggeduser.email,
            postid :'',
            userid :this.Loggeduser.key,
            type :'Follow'
        });
        return true;
      }
    
  }
  public followNotfication()
  {
    
  }
} 
 
