import { Injectable } from '@angular/core';

import { DatabaseUserProvider } from '../providers/database/databaseUser';
import { StorageService } from '../app/service.storage';

import { User } from '../models/user.model';

@Injectable()
export class DataManagement {
    constructor(
        private databaseUserProvider: DatabaseUserProvider,
        private storageService: StorageService) { }

    /** USER */

    public getUser(userId: string) {
        return new Promise<User>((resolve, reject) => {
            return this.databaseUserProvider.getUserBy(userId)
                .then((response) => {
                    this.storageService.setUserData(response.response);
                    resolve(response.response);
                })
                .catch(() => {
                    this.storageService.getUserData()
                        .then((response) => {
                            resolve(response);
                        }).catch(() => {
                            reject();
                        });
                });
        });
    }

    public registerUser(authData) {
        return new Promise<any>((resolve, reject) => {
            return this.databaseUserProvider.addUser(authData)
                .then(() => {
                    resolve();
                })
                .catch((response: any) => {
                    reject('OPERATION_NOT_ALLOWED');
                });
        });
    }

   
}