
export class User {

    id: string
    name: string;
    email: string;
    photo: string;
    providerId: string;

    constructor(user: any) {
        this.id = user.uid;
        this.name = user.displayName ? user.displayName : (user.fullname ? user.fullname : '');
        this.email = user.email;
        this.photo = user.photo ? user.photo : '';
        this.providerId = user.providerId;
    }

    setUserParameters(snapshot: any) {
        this.name = snapshot.child("name").val();
        this.email = snapshot.child("email").val();
        this.photo = snapshot.child("photo").val() ? snapshot.child("photo").val() : '';
        this.providerId = snapshot.child("providerId").val();
        this.id = snapshot.child("uid").val();
    }
}