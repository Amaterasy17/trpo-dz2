import {UserEntity} from "../entities/UserEntity";
import {UserAuthData, UserService} from "../service/user-service/user-service";


export interface IUserLayer {
    registerUser(user: Omit<UserEntity, 'id'>): Promise<UserEntity>;
    authUser({telephone, password}: UserAuthData): Promise<UserEntity>
}


export class UserLayer implements IUserLayer {
    constructor(private userService: UserService) {
    }

    async registerUser(user: Omit<UserEntity, "id">): Promise<UserEntity> {
        return this.userService.registerUser(user);
    }

    async authUser(data: UserAuthData): Promise<UserEntity> {
        return this.userService.authUser(data);
    }
}
