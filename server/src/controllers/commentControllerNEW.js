import {PostModel} from "../schemas/index.js";

export const create = async (req, res) => {
    try {
        const doc = await PostModel.findOneAndUpdate(
            req.body.postId,
            {
                $push: {
                    comments: {
                        author: req.body.author,
                        text: req.body.text,
                        createdAt: new Date()
                    }
                }
            }, {
                new: true
            })

        res.json(doc)


    } catch (err) {
        res.status(500).json({
            message: 'TRY CATCH ERROR: ' + err
        })
    }
}

export const remove = async (req, res) => {
    try {
        const doc = await PostModel.findByIdAndUpdate(
            req.body.postId,
            {
                $pull: {
                    comments: {
                        _id: req.params.id
                    }
                }
            }, {
                new: true
            }
        )

        res.json(doc)
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

export const update = async (req, res) => {
    try {
        const doc = await PostModel.findOneAndUpdate(
            {
                _id: req.body.postId,
                'comments._id': req.params.id
            }, {
                $set: {
                    'comments.$.text': req.body.text
                }
            }, {
                new: true
            }
        )

        res.json(doc)
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}


export const getLastComments = async (req, res, next) => {
    try {
        const posts = await PostModel.find().limit(10).exec()
        const comments = posts.map(item => item.comments).flat().slice(0, 15)


        res.json(comments.reverse())
    } catch (err) {
        next(
            res.status(500).json({
                message: 'posts.getLastComments error: ' + err
            })
        )

    }
}