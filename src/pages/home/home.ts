import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { StorageService } from './../../app/service.storage';

import { User } from '../../models/user.model';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	private user: User;

	constructor(
		private navCtrl: NavController,
		private params: NavParams,
		private authProvider: AuthProvider,
		private storageService: StorageService) {

		this.user = this.params.get('user');
		if (!this.user) {
			this.storageService.getUserData().then((response) => {
				this.user = response;
			});
		}

	}

	public logout() {
		this.storageService.setUserIsLoged(false);
		this.authProvider.logoutUser();
		this.navCtrl.setRoot('LoginPage');
	}
}