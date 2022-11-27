import { ErrorRequestHandler } from 'express'

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'Something went wrong. Try again later'

    res.status(status).json({ message })
}

export {
    errorMiddleware
}