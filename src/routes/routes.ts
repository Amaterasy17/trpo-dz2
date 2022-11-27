import { Router } from 'express'
import { userRouter } from './routers/user-router'
import {houseRouter} from "./routers/house-router";
import {HouseService} from "../service/house-service/house-service";
import {HouseGateway} from "../database/house-gateway/house-gateway";
import {UserGateway} from "../database/user-gateway/user-gateway";
import {UserService} from "../service/user-service/user-service";

const router = Router();

export const houseService = new HouseService(new HouseGateway(), new UserGateway());
export const userService = new UserService();

router.use('/user', userRouter)
router.use('/house', houseRouter)

export {
    router,
}
