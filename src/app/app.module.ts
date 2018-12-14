import { PostService } from './../services/postService';
import { LocationPage } from './../pages/location/location';
import { AuthServices } from './../services/auth';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { SearchPage } from './../pages/search/search';
import { ProfilePage } from './../pages/profile/profile';
import { NotificationPage } from './../pages/notification/notification';
import { TabsPage } from './../pages/tabs/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserService } from '../services/userServices';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { NotificationService } from '../services/notificationService';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocationPage,
    NotificationPage,
    ProfilePage,
    SearchPage,
    SigninPage,
    SignupPage,
    TabsPage,
    NotificationPage,
    SearchPage
    
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDoDSUnSuYfJCLY-PkdDBIa8ZN_2BE6ank'
    }),
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NotificationPage,
    ProfilePage,
    SearchPage,
    SigninPage,
    SignupPage,
    TabsPage,
    LocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServices,UserService,PostService,NotificationService
  ]
})
export class AppModule {}
