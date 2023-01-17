import Router from 'express'
import userRouter from './userRouter.js'
import postRouter from "./postRouter.js";
import fileRouter from "./fileRouter.js";
import tagRouter from "./tagRouter.js";
import commentRouter from "./commentRouter.js";

const rootRouter = new Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/posts', postRouter)
rootRouter.use('/comments', commentRouter)
rootRouter.use('/uploads', fileRouter)
rootRouter.use('/tags', tagRouter)

export default rootRouter