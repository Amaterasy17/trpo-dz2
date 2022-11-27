import {AbstractDatabase} from "../database";
import {HouseEntity} from "../../entities/HouseEntity";

export interface IHouseGateway {
    findHousesByUserId(userId: number): Promise<HouseEntity[] | null>;
    findHouse(houseId: number): Promise<HouseEntity | null>;
    addHouse(house: Omit<HouseEntity, 'id'>): Promise<HouseEntity | null>;
    deleteHouse(houseId: number): void;
    editHouse(house: HouseEntity): Promise<HouseEntity | null>;
}


export class HouseGateway extends AbstractDatabase implements IHouseGateway {
    async findHousesByUserId(userId: number): Promise<HouseEntity[] | null> {
        return await this.db.manyOrNone<HouseEntity>('select * from houses where owner_id = ${userId}', {userId});
    }

    async findHouse(houseId: number): Promise<HouseEntity | null> {
        return await this.db.oneOrNone<HouseEntity>('select id, name, description, address, owner_id from houses where id = ${id}', {
            id: houseId,
        });
    }

    async addHouse({name, description, address, owner_id}: Omit<HouseEntity, 'id'>): Promise<HouseEntity | null> {
        return await this.db.oneOrNone<HouseEntity>('insert into houses(name, description, address, owner_id) values(${name}, ${description}, ${address}, ${owner_id}) returning id, name, description, address, owner_id', {
            name,
            description,
            address,
            owner_id,
        });
    }

    async editHouse({id, name, address, description, owner_id}: HouseEntity): Promise<HouseEntity | null> {
        return await this.db.oneOrNone<HouseEntity>('update houses set name = ${name}, description = ${description}, address = ${address}, owner_id = ${owner_id} where id = ${id} returning id, name, description, address, owner_id', {
            id,
            name,
            description,
            address,
            owner_id,
        });
    }

    deleteHouse(houseId: number): void {
        void this.db.one('delete id, name, description, address, owner_id from houses where id = ${id}', {
            id: houseId,
        })
    }

}
