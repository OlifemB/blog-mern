import {} from 'dotenv/config'
import express from 'express'
import * as db from './db.js'
import rootRouter from "./routes/index.js"
import cors from 'cors'

const PORT = 5000
const app = express()


app.use(express.json())
app.use(cors())
app.use('/', rootRouter)

db.connect()

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server started on port: ' + PORT)
})