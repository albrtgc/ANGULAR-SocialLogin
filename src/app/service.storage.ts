import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from "../models/user.model";

@Injectable()
export class StorageService {

    private user = 'user';
    private userIsLoged = 'userIsLoged';

    constructor(public storage: Storage) { }

    public clear() {
        this.storage.clear();
    }

    /**
    * USER
    */

    public setUserIsLoged(isLoged: boolean): void {
        localStorage.setItem(this.userIsLoged, JSON.stringify(isLoged));
    }

    public getUserIsLoged(): boolean {
        return localStorage.getItem(this.userIsLoged) == 'true';
    }

    public setUserData(userData) {
        localStorage.setItem(this.user, JSON.stringify(userData));
    }

    public getUserData(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            resolve(JSON.parse(localStorage.getItem(this.user)));
        });
    }
}

