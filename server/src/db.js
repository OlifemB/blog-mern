import mongoose from "mongoose";
import * as color from './utils/colors.js'

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME

export const connect = () => {
    mongoose.Promise = global.Promise
    mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
        .then(() => console.log(color.blue, 'Database connection successful'))
        .catch(err => console.log(color.red, err))
}