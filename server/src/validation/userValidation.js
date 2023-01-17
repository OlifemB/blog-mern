import {body} from "express-validator";

export const register = [
    body('email', 'incorrect email').isEmail(),
    body('password', 'incorrect password').isLength({min: 5}),
    body('fullName', 'incorrect name').isLength({min: 3}),
    body('avatarUrl', 'incorrect avatar').optional().isURL()
]

export const login = [
    body('email', 'incorrect email').isEmail(),
    body('password', 'incorrect password').isLength({min: 5}),
]