import {HouseGateway} from "../../database/house-gateway/house-gateway";
import {HouseEntity} from "../../entities/HouseEntity";
import createError from "http-errors";
import {UserGateway} from "../../database/user-gateway/user-gateway";

export class HouseService {
    constructor(private houseGateway: HouseGateway, private userGateway: UserGateway){}

    public async createHouse(house: Omit<HouseEntity, 'id'>) {
        const user = await this.userGateway.findUser(house.owner_id);
        if (!user) throw createError.BadRequest('No this user');

        const newHouse = await this.houseGateway.addHouse(house);
        if (!newHouse) throw createError.InternalServerError('DB error');

        return newHouse;
    }

    public async getAllHousesByUser(userId: number): Promise<HouseEntity[] | null> {
        return await this.houseGateway.findHousesByUserId(userId);
    }
}
