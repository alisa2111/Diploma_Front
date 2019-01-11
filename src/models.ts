export interface IUser {
    email: string;
    password: string;
}

export interface IStore {
    user: Partial<IUser>
}