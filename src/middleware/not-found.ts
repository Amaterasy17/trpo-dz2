import { RequestHandler } from 'express'
import createError from 'http-errors'

const notFoundMiddleware: RequestHandler = () => {
    throw createError.NotFound('Url not found')
}

export {
    notFoundMiddleware
}