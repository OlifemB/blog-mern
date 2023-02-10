import jwt from "jsonwebtoken";

const SECRET_KEY = 'random-secret-key'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY)

            req.userId = decoded._id;
            next()

        } catch (e) {
            return res.status(403).json({
                message: 'No access'
            })
        }

    } else {
        return res.status(403).json({
            message: 'No access'
        })
    }
}
