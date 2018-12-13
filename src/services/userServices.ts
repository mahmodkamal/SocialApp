<<<<<<< HEAD
import { Location } from './../models/location';
import { AuthServices } from './auth';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http, Response } from "@angular/http";
@Injectable()
export class UserService
{
  Loggeduser: User;
  Users :User[]=[];
  constructor(private http :Http ,private  authService :AuthServices)
  {  
  }
  public AddUser(user :User,token :string)
  {
     this.Loggeduser=user; 
     const userid=this.authService.getActiveUser().uid; 
     this.Users.push(user);
     return this.http.post('https://socialapp-de96a.firebaseio.com/Users.json',this.Users)
     .map((response:Response) =>
        {
            return response.json();
        });
  }
  public RetriveSpecificUserUser(Email:string)
  {
    for(let user of this.Users)
    {
      if(user.email==Email)
      {
        this.Loggeduser=user;
      }
    }
  }
  public RetriveUsers(token :string)
  {
     const userid=this.authService.getActiveUser().uid; 
     return this.http.get("https://socialapp-de96a.firebaseio.com/Users.json")
     .map((response:Response) =>
        {
           const users :User[] = response.json() ? response.json():[];
           for(let user of users)
           {
               if(!user.hasOwnProperty('location'))
               {
                   user.location=new Location(1.00,1.00);
               } 
           } 
           return users;
        })
        .do(
            (users: User[])=>
             {
               if(users)
               {
                   this.Users=users;
                   console.log(this.Users);
               }
               else
               {
                   this.Users=[];
               }
             });
  }
=======
import { Location } from './../models/location';
import { AuthServices } from './auth';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http, Response } from "@angular/http";
@Injectable()
export class UserService
{
  Loggeduser: User;
  Users :User[]=[];
  constructor(private http :Http ,private  authService :AuthServices)
  {  
  }
  public AddUser(user :User,token :string)
  {
     this.Loggeduser=user; 
     const userid=this.authService.getActiveUser().uid; 
     this.Users.push(user);
     return this.http.post('https://socialapp-de96a.firebaseio.com/Users.json',this.Users)
     .map((response:Response) =>
        {
            return response.json();
        });
  }
  public RetriveSpecificUserUser(Email:string)
  {
    for(let user of this.Users)
    {
      if(user.email==Email)
      {
        this.Loggeduser=user;
      }
    }
  }
  public RetriveUsers(token :string)
  {
     const userid=this.authService.getActiveUser().uid; 
     return this.http.get("https://socialapp-de96a.firebaseio.com/Users.json")
     .map((response:Response) =>
        {
           const users :User[] = response.json() ? response.json():[];
           for(let user of users)
           {
               if(!user.hasOwnProperty('location'))
               {
                   user.location=new Location(1.00,1.00);
               } 
           } 
           return users;
        })
        .do(
            (users: User[])=>
             {
               if(users)
               {
                   this.Users=users;
                   console.log(this.Users);
               }
               else
               {
                   this.Users=[];
               }
             });
  }
>>>>>>> 1d6f589052440d0f2fbcfa79f8bfe9e7bb254c91
}