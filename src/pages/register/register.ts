import { Component } from '@angular/core';
import { IonicPage, NavController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailValidator } from '../../validators/email';
import { ApiComponents } from '../../app/api-components';
import { DataManagement } from '../../dataManagement/dataManagement'
import { AuthProvider } from '../../providers/auth/auth';
import { StorageService } from './../../app/service.storage';

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html'
})
export class RegisterPage {

	private loginForm: FormGroup;
	private loading: Loading;

	constructor(
		private navCtrl: NavController,
		private authData: AuthProvider,
		private dataManagement: DataManagement,
		private formBuilder: FormBuilder,
		private apiComponents: ApiComponents,
		private storageService: StorageService) {

		this.loginForm = this.formBuilder.group({
			name: ['Alberto', Validators.compose([Validators.minLength(3), Validators.required])],
			email: ['alberto@email.com', Validators.compose([Validators.required, EmailValidator.isValid])],
			password: ['insinno123', Validators.compose([Validators.minLength(6), Validators.required])]
		});
	}

	public registerUser() {
		this.apiComponents.createLoading().then((loading: Loading) => {
			loading.present();
			this.authData.signupUser(this.loginForm.value.name, this.loginForm.value.email, this.loginForm.value.password)
				.then(authData => {
					this.dataManagement.registerUser(authData.response)
						.then(() => {
							this.storageService.setUserIsLoged(true);
							this.storageService.setUserData(authData.response);
							this.navCtrl.setRoot('HomePage', { user: authData.response });
							loading.dismiss();
						})
						.catch((error) => {
							console.log(error);
							loading.dismiss();
						});
				}, errorCode => {
					console.log(errorCode);
					loading.dismiss();
				});
		});
	}
}
