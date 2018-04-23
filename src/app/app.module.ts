import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { ApiComponents } from './api-components';
import { Environment } from '../environments/environments';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseUserProvider } from '../providers/database/databaseUser';
import { DataManagement } from '../dataManagement/dataManagement';
import { StorageService } from "./service.storage";
import { IonicStorageModule, Storage } from '@ionic/storage';

import 'firebase/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus';

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(Environment.firebase),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp
	],
	providers: [
		StatusBar,
		SplashScreen,
		AuthProvider,
		DatabaseUserProvider,
		DataManagement,
		StorageService,
		ApiComponents,
		TwitterConnect,
		Facebook,
		GooglePlus,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
