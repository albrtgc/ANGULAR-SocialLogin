import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

import { Facebook } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { GooglePlus } from '@ionic-native/google-plus';

import { User } from '../../models/user.model';
import { UserResponse } from './../../models/promise-response.model';

@Injectable()
export class AuthProvider {

    constructor(
        private afAuth: AngularFireAuth,
        private facebook: Facebook,
        private twitterConnect: TwitterConnect,
        private googlePlus: GooglePlus) { }

    public loginUser(newEmail: string, newPassword: string): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword).then((response: any) => {
            return Promise.resolve(response);
        }).catch((response: any) => {
            return Promise.reject(response.code);
        });
    }

    public resetPassword(email: string): Promise<any> {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    public logoutUser(): Promise<any> {
        return this.afAuth.auth.signOut();
    }

    public signupUser(name: string, email: string, password: string): Promise<any> {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((response: any) => {
            let userResponse: UserResponse = new UserResponse;
            userResponse.response = new User(response);
            userResponse.response.name = name;
            return Promise.resolve(userResponse);
        }).catch((response: any) => {
            return Promise.reject(response.code);
        });
    }

    public loginTwitter(): Promise<any> {
        return new Promise<User>((resolve, reject) => {
            return this.twitterConnect.login()
                .then((response) => {
                    firebase.auth().signInWithCredential(firebase.auth.TwitterAuthProvider.credential(response.token, response.secret))
                        .then(response => {
                            resolve(response);
                        })
                        .catch(error => {
                            reject(error);
                        })
                }, (error) => {
                    reject(error);
                });
        });
    }

    public loginFacebook(): Promise<any> {
        return new Promise<User>((resolve, reject) => {
            return this.facebook.login(['email'])
                .then((response) => {
                    firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken))
                        .then((success) => {
                            resolve(success);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }).catch((error) => {
                    reject(error)
                });
        });
    }

    public loginGoogle(): Promise<any> {
        return new Promise<User>((resolve, reject) => {
            return this.googlePlus.login({
                webClientId: "924571351983-lv4e1is82vc6lao3t0skt42pemobcpkh.apps.googleusercontent.com",
                offline: true,
            }).then((response) => {
                const googleCredential = firebase.auth.GoogleAuthProvider.credential(response.idToken);
                firebase.auth().signInWithCredential(googleCredential)
                    .then((success) => {
                        resolve(success);
                    }).catch((error) => {
                        reject(error);
                    });
            }).catch((error) => {
                reject(error);
            });
        });
    }
}