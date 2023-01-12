import Router from "express";
import {postController} from "../controllers/index.js";

const tagRouter = new Router()

tagRouter.get('/', postController.getLastTags)

export default tagRouter