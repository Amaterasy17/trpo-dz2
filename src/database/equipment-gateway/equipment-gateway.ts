import {EquipmentEntity} from "../../entities/EquipmentEntity";
import {AbstractDatabase} from "../database";

export interface IEquipmentGateway {
    findEquipment(id: number): Promise<EquipmentEntity | null>;
    addEquipment(equipment: Omit<EquipmentEntity, 'id'>): Promise<EquipmentEntity>;
    deleteEquipment(id: number): void;
    editEquipment(equipment: EquipmentEntity): Promise<EquipmentEntity | null>;
}

export class EquipmentGateway extends AbstractDatabase implements IEquipmentGateway {
    async findEquipment(id: number): Promise<EquipmentEntity | null> {
        return await this.db.oneOrNone<EquipmentEntity>('select id, name, description, house_id from equipment where id = ${id}', {
            id,
        });
    }
    async addEquipment({name, description, house_id}: Omit<EquipmentEntity, "id">): Promise<EquipmentEntity> {
        return await this.db.one<EquipmentEntity>('insert into equipment(name, description, house_id) values(${name}, ${description}, ${house_id}) returning id, name, description, house_id', {
            name,
            description,
            house_id
        });
    }

    async editEquipment({id, name, description, house_id}: EquipmentEntity): Promise<EquipmentEntity | null> {
        return await this.db.oneOrNone<EquipmentEntity>('update equipment set name = ${name}, description = ${description}, house_id = ${house_id} where id = ${id} returning id, name, description, house_id', {
            id,
            name,
            description,
            house_id,
        });
    }

    deleteEquipment(id: number) {
        void this.db.one('delete id, name, description, house_id from equipment where id = ${id}', {
            id,
        })
    }
}
