const developmentConfig = {
    database: {
        host: 'localhost',
        port: 5432,
        database: 'koya_trpo',
        user: 'postgres',
        password: 'postgres',
        max: 30,
    },
    server: {
        port: 3000,
    },
}

export {
    developmentConfig,
}