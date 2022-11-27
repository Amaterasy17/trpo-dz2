import { Router } from 'express'
import createError from 'http-errors'
import {HouseLayer} from "../../service-layers/house-layer";
import {houseService, userService} from "../routes";

enum HouseRouterPath {
    Create = '/create',
    All = '/all',
    AllByTelephone = '/all/telephone',
}

const houseRouter = Router();

houseRouter.post(HouseRouterPath.Create, async (req, res, next) => {
   try {
       const { name, description, address, userId } = req.body

       if (!name) throw createError.BadRequest('No name')
       if (!description) throw createError.BadRequest('No description')
       if (!address) throw createError.BadRequest('No address')
       if (!userId) throw createError.BadRequest('No userId')

       const houseLayer = new HouseLayer(houseService, userService);
       const data = await houseLayer.create({
           name,
           description,
           address,
           owner_id: userId
       })


       res.json(data)
   } catch (err) {
       next(err)
   }

})

houseRouter.get(HouseRouterPath.All, async (req, res, next) => {
   try {
       const { userId } = req.body;
       if (!userId) throw createError.BadRequest('No userId')

       const houseLayer = new HouseLayer(houseService, userService);
       const allHouses = await houseLayer.getAllHousesByUserId(userId);

       res.json(allHouses || []);
   } catch (err) {
       next(err);
   }
});

houseRouter.get(HouseRouterPath.AllByTelephone, async (req, res, next) => {
    try {
        const { telephone } = req.body;
        if (!telephone) throw createError.BadRequest('No telephone')

        const houseLayer = new HouseLayer(houseService, userService);
        const allHouses = await houseLayer.getAllHousesByUserTelephone(telephone);

        res.json(allHouses || []);
    } catch (err) {
        next(err);
    }
});

export {
    houseRouter,
}
