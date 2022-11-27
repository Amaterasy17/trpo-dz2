import pgp from 'pg-promise'
import { developmentConfig } from '../config'

const dbConnect = pgp()(developmentConfig.database)

export abstract class AbstractDatabase {
    constructor(protected db = dbConnect) {}
}
