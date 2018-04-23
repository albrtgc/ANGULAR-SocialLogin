import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';

import { UserResponse } from './../../models/promise-response.model';
import { User } from './../../models/user.model';

@Injectable()
export class DatabaseUserProvider {

    private users;

    constructor(private afDatabase: AngularFireDatabase) {

        this.users = afDatabase.list('/users');
    }

    public getUsers(): User[] {
        let usersList: User[] = [];
        this.users.forEach(element => {
            usersList.push(element);
        });
        return usersList;
    }

    public getUserBy(userId: string): Promise<UserResponse> {
        return new Promise((resolve, reject) => {
            var refRecipe = firebase.database().ref("/users/" + userId);
            var vm = this;
            refRecipe.once("value")
                .then(function (snapshot) {
                    let userResponse: UserResponse = new UserResponse;
                    userResponse.response = new User('');
                    userResponse.response.setUserParameters(snapshot);
                    resolve(userResponse)
                });
        });
    }

    public addUser(user: User) {
        return this.afDatabase.object(`/users/${user.id}`).set(user)
            .then(() => {
                Promise.resolve();
            })
            .catch((response) => {
                Promise.reject(response);
            });
    }
}