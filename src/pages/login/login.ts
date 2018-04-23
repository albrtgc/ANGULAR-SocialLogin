import { Component } from '@angular/core';
import { IonicPage, NavController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiComponents } from '../../app/api-components';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { DataManagement } from './../../dataManagement/dataManagement';
import { StorageService } from './../../app/service.storage';

import { User } from './../../models/user.model';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	private loginForm: FormGroup;

	constructor(
		public navCtrl: NavController,
		private formBuilder: FormBuilder,
		private authProvider: AuthProvider,
		private dataManagement: DataManagement,
		private apiComponents: ApiComponents,
		private storageService: StorageService) {

		this.loginForm = this.formBuilder.group({
			email: ['alberto@email.com', Validators.compose([Validators.required, EmailValidator.isValid])],
			password: ['insinno123', Validators.compose([Validators.minLength(6), Validators.required])]
		});
	}

	public loginUser() {
		this.apiComponents.createLoading().then((loading: Loading) => {
			loading.present();
			this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
				.then(authData => {
					this.dataManagement.getUser(authData.uid)
						.then((response) => {
							this.loginSuccess(loading, response);
						}).catch((error) => {
							loading.dismiss();
						});
				}, errorCode => {

				});

		});
	}

	loginTwitter() {
		this.apiComponents.createLoading().then((loading: Loading) => {
			loading.present();
			this.authProvider.loginTwitter()
				.then(authData => {
					this.prepareUserSocialLogin(authData, loading);
				}, errorCode => {
					loading.dismiss().then(() => {
						console.log(errorCode);
					});
				});
		});
	}

	loginFacebook() {
		this.apiComponents.createLoading().then((loading: Loading) => {
			loading.present();
			this.authProvider.loginFacebook()
				.then(authData => {
					this.prepareUserSocialLogin(authData, loading);
				}, errorCode => {
					loading.dismiss().then(() => {
						console.log(errorCode);
					});
				});
		});
	}

	loginGoogle() {
		this.apiComponents.createLoading().then((loading: Loading) => {
			loading.present();
			this.authProvider.loginGoogle()
				.then(authData => {
					this.prepareUserSocialLogin(authData, loading);
				}, errorCode => {
					loading.dismiss().then(() => {
						console.log(errorCode);
					});
				});
		});
	}

	public createAccount() {
		this.navCtrl.setRoot('RegisterPage');
	}

	private loginSuccess(loading: Loading, response) {
		loading.dismiss();
		this.storageService.setUserIsLoged(true);
		this.storageService.setUserData(response);
		this.navCtrl.setRoot('HomePage', { user: response });
	}

	private prepareUserSocialLogin(authData, loading: Loading) {
		this.dataManagement.getUser(authData.uid)
			.then((response) => {
				if (!response.id) {
					let user = new User(authData);
					this.registerNewuser(user)
						.then(() => {
							this.loginSuccess(loading, user);
						}).catch(() => {
							loading.dismiss();
						});
				} else {
					this.loginSuccess(loading, response);
				}
			}).catch((error) => {
				loading.dismiss();
			});
	}

	private registerNewuser(authData) {
		return new Promise<any>((resolve, reject) => {
			return this.dataManagement.registerUser(authData)
				.then((response) => {
					resolve();
				})
				.catch((error) => {
					reject();
					console.log(error);
				});
		});
	}
}
