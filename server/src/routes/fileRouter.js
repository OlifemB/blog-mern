import express, {Router} from "express";
import {fileController} from "../controllers/index.js";
import {authMiddleware, fileMiddleware} from '../middlewares/index.js';

const fileRouter = new Router()

fileRouter.use('/', express.static('uploads'));
fileRouter.post('/', authMiddleware.checkAuth, fileMiddleware.upload.single('image'), fileController.upload)

export default fileRouter