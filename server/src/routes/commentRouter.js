import Router from 'express'
import {commentController} from '../controllers/index.js'
import {authMiddleware} from '../middlewares/index.js'

const commentRouter = new Router()

commentRouter.get('/', commentController.getAll)
commentRouter.get('/:id', commentController.getOne)
commentRouter.post('/', authMiddleware.checkAuth, commentController.create)
commentRouter.delete('/:id', authMiddleware.checkAuth, commentController.remove)
commentRouter.patch('/:id', authMiddleware.checkAuth, commentController.update)

export default commentRouter