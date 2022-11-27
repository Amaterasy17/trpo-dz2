import {UserEntity} from "../../entities/UserEntity";
import {AbstractDatabase} from "../database";

export interface IUserGateway {
    findUserByTelephone(telephone: string): Promise<UserEntity | null> ;
    findUser(id: number): Promise<UserEntity | null>;
    addUser(user: Omit<UserEntity, 'id'>): Promise<UserEntity | null>;
    editUser(user: UserEntity): Promise<UserEntity | null>;
}


export class UserGateway extends AbstractDatabase implements IUserGateway {
    async findUser(id: number): Promise<UserEntity | null> {
        return await this.db.oneOrNone<UserEntity>('select id, name, surname, email, telephone from users where id = ${id}', {
            id,
        });
    }

    async findUserByTelephone(telephone: string): Promise<UserEntity | null> {
        return await this.db.oneOrNone<UserEntity>('select id, name, surname, email, telephone, password from users where telephone = ${telephone}', {
            telephone,
        });
    }

    async addUser({name, surname, email, telephone, password}:  Omit<UserEntity, 'id'>): Promise<UserEntity | null> {
        return await this.db.oneOrNone<UserEntity>('insert into users(name, surname, email, telephone, password) values(${name}, ${surname}, ${email}, ${telephone}, ${password}) returning id, name, surname, email, telephone', {
            name,
            surname,
            email,
            telephone,
            password,
        });
    }

    async editUser({id, name, email, surname, telephone, password}: UserEntity): Promise<UserEntity | null> {
        return await this.db.oneOrNone<UserEntity>('update users set name = ${name}, surname = ${surname}, email = ${email}, telephone = ${telephone}, password = ${password} where id = ${id} returning id, name, surname, email, telephone', {
            id,
            name,
            email,
            telephone,
            surname,
            password,
        });
    }

    async getAll() {
        return await this.db.any('select * from users');
    }
}
