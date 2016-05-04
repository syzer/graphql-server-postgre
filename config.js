require('dotenv').load();

export default {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    app: {
        port: process.env.APP_PORT
    }
}
