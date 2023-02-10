import Router from 'express';
import {postController} from "../controllers/index.js";
import {authMiddleware} from "../middlewares/index.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import * as postValidation from '../validation/postValidation.js';

const postRouter = new Router()

postRouter.get('/tags', postController.getLastTags)
postRouter.get('/', postController.getAll)
postRouter.get('/:id', postController.getOne)
postRouter.post('/', authMiddleware.checkAuth, handleValidationErrors, postValidation.create, postController.create)
postRouter.delete('/:id', authMiddleware.checkAuth, postController.remove)
postRouter.patch('/:id', authMiddleware.checkAuth, handleValidationErrors, postController.update)
postRouter.get('/:id/comments',  postController.getPostComments)

export default postRouter