import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StorageService } from './../app/service.storage';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any;

	constructor(
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private storageService: StorageService) {

		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
			this.selectScreen()
		});
	}

	private selectScreen() {
		if (this.storageService.getUserIsLoged()) {
			this.rootPage = 'HomePage';
		} else {
			this.rootPage = 'LoginPage';
		}
	}
}

