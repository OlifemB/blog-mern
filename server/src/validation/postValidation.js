import {body} from "express-validator";

export const create = [
    body('title', 'incorrect title').isLength({min: 3}).isString(),
    body('text', 'incorrect text').isLength({min: 10}).isString(),
    body('tags', 'incorrect tags').optional().isString(),
    body('imageUrl', 'incorrect image').optional().isString()
]