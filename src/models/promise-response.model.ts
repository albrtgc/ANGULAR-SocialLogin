import { User } from './user.model'

export class PromiseResponse {
    error: any;
    response: any;
}

export class UserResponse extends PromiseResponse {
    response: User;
}