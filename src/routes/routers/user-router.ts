import { Router } from 'express'
import createError from 'http-errors'
import {UserLayer} from "../../service-layers/user-layer";
import {userService} from "../routes";

enum UserPath {
  Auth = '/auth',
  Reg = '/reg',
}

const userRouter = Router()


userRouter.post(UserPath.Auth, async (req, res, next) => {
  try {
    const { telephone, password } = req.body

    if (!telephone) throw createError.BadRequest('No telephone')
    if (!password) throw createError.BadRequest('No password')

    const userLayer = new UserLayer(userService);
    const data = await userLayer.authUser({telephone, password});

    res.json(data);
  } catch (err) {
    next(err);
  }
})

userRouter.post(UserPath.Reg, async (req, res, next) => {
  try {
    const { name, surname, email, telephone, password } = req.body

    if (!name) throw createError.BadRequest('No name')
    if (!surname) throw createError.BadRequest('No surname')
    if (!email) throw createError.BadRequest('No email')
    if (!telephone) throw createError.BadRequest('No telephone')
    if (!password) throw createError.BadRequest('No password')

    const userLayer = new UserLayer(userService);
    const data = await userLayer.registerUser({telephone, password, name, surname, email});

    res.json(data)
  } catch (err) {
    next(err)
  }
})

export {
  userRouter,
}
