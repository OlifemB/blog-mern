import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserModel} from "../schemas/index.js";

const SECRET_KEY = 'random-secret-key'

export const register = async (req, res, next) => {
    try {

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })
        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id,
            },
            SECRET_KEY,
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ...userData} = user._doc;
        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        next(
            res.status(500).json({
                message: err
            })
        )
    }
}


export const login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).json({
                message: 'No user in database'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Incorrect login or password'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            SECRET_KEY,
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })

    } catch (err) {
        next(
            res.status(500).json({
                message: err
            })
        )
    }
}


export const auth = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const {passwordHash, ...userData} = user._doc;
        res.json(userData)

    } catch (err) {
        next(
            res.status(500).json({
                message: 'Error: ' + err
            })
        )

    }
}