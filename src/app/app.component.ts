import { AuthServices } from './../services/auth';
import { TabsPage } from './../pages/tabs/tabs';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuClose, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated :boolean =false;
  @ViewChild('nav') nav:NavController; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private menuCtrl:MenuController,private authservice: AuthServices) {
    firebase.initializeApp({
      apiKey: "AIzaSyAViuMGdlJIqqo8QjLZXi2W_Tun3Vnv6GA",
      authDomain: "socialapp-de96a.firebaseapp.com",
      databaseURL: "https://socialapp-de96a.firebaseio.com",
      projectId: "socialapp-de96a",
      storageBucket: "socialapp-de96a.appspot.com",
      messagingSenderId: "326913249290"
    });
    firebase.auth().onAuthStateChanged(user =>
      {
        if(user)
        {
          this.isAuthenticated=true;
          this.rootPage=TabsPage;
        }
        else
        {
          this.isAuthenticated=false;
          this.rootPage=SigninPage;
        }
      });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any)
  {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
  onLogout()
  {
    this.authservice.logout();
    this.menuCtrl.close();
    this.nav.setRoot(this.signinPage);
  }
  editProfile()
  {

  }
}

