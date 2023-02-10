import mongoose from "mongoose";

const DB_HOST = 'localhost'
const DB_PORT = 27017
const DB_NAME = 'blog'

export const connect = () => {
    mongoose.Promise = global.Promise
    mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
        .then(() => console.log('Database connection successful'))
        .catch(err => console.log(err))
}