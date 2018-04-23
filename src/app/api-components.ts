import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class ApiComponents {

    constructor(private loadingCtrl: LoadingController) { }

    public createLoading(): Promise<Loading> {
        return new Promise((resolve, reject) => {
            let loading = this.loadingCtrl.create();
            resolve(loading);
        });
    }
}