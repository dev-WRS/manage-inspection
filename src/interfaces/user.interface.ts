import {Role, UserStatus} from '@models/user.model';

export class UserLoggedIn {
    google_id!: string;
    displayName!: string;
    email!: string;
    provider!: string;
    sessionToken!: string;
    role!: Role;
    status!: UserStatus;

    constructor(init?: Partial<UserLoggedIn>) {
        Object.assign(this, init);
    }
}