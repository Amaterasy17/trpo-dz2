import {UserGateway} from "../../database/user-gateway/user-gateway";
import {UserEntity} from "../../entities/UserEntity";
import createError from "http-errors";

export interface UserAuthData {
    telephone: string;
    password: string;
}

export class UserService {
    private userGateway: UserGateway;

    constructor() {
        this.userGateway = new UserGateway();
    }

    async registerUser(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
        const {name, surname, email, telephone} = user;
        if (name.length > 64) throw createError.BadRequest('Name > 64')
        if (surname.length > 64) throw createError.BadRequest('Surname > 64')
        if (email.length > 64) throw createError.BadRequest('Email > 64')
        if (telephone.length > 12) throw createError.BadRequest('Telephone > 12')

        // this.userGateway.getAll().then(console.log);

        const searchedUser = await this.userGateway.findUserByTelephone(telephone);
        if (!!searchedUser) throw createError.BadRequest('Telephone exist');


        const newUser = await this.userGateway.addUser(user);
        if (!(newUser && newUser.id)) throw createError.InternalServerError('DB error')

        return newUser;
    }

    async authUser({telephone, password}: UserAuthData): Promise<UserEntity> {
        if (telephone.length > 12) throw createError.BadRequest('Telephone > 12')


        const user = await this.userGateway.findUserByTelephone(telephone);
        if (!user) throw createError.BadRequest('Wrong telephone')


        if (user.password !== password) throw createError.BadRequest('Wrong password')

        return user;
    }

    async getUserByTelephone(telephone: string): Promise<UserEntity | null> {
        return await this.userGateway.findUserByTelephone(telephone);
    }
}
