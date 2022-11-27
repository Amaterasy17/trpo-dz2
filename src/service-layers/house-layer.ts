import {HouseEntity} from "../entities/HouseEntity";
import {HouseService} from "../service/house-service/house-service";
import {UserService} from "../service/user-service/user-service";

export interface IHouseLayer {
    getAllHousesByUserId(userId: number): Promise<HouseEntity[] | null>;
    create(house: Omit<HouseEntity, 'id'>): Promise<HouseEntity | null>;
    getAllHousesByUserTelephone(telephone: string): Promise<HouseEntity[] | null>;
}


export class HouseLayer implements IHouseLayer {
    constructor(private houseService: HouseService, private userService: UserService) {
    }

    async getAllHousesByUserId(userId: number): Promise<HouseEntity[] | null> {
        return await this.houseService.getAllHousesByUser(userId);
    }

    async create(house: Omit<HouseEntity, 'id'>): Promise<HouseEntity | null> {
        return await this.houseService.createHouse(house);
    }

    async getAllHousesByUserTelephone(telephone: string): Promise<HouseEntity[] | null> {
        const user = await this.userService.getUserByTelephone(telephone);
        if (!user) return null;

        return this.houseService.getAllHousesByUser(user.id);
    }
}
