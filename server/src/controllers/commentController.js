import {CommentModel, PostModel} from '../schemas/index.js'


export const getAll = async (req, res, next) => {
    try {
        const comments = await CommentModel.find().populate('author').exec()
        const {author, ...commentsData} = comments
        res.json(comments)
    } catch (err) {
        next(
            res.status(500).json({
                message: 'comments.getAll error: ' + err
            })
        )
    }
}

export const getByPostId = async (req, res, next) => {
    try {
        const comments = await CommentModel.find({post: req.body.post}).populate('author').exec()
        res.json(comments)
    } catch (err) {
        next(
            res.status(500).json({
                message: 'comments.getAll error: ' + err
            })
        )
    }
}


export const getOne = async (req, res, next) => {
    try {
        CommentModel.findOne({
            _id: req.params.id
        }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message: 'posts.getOne error: ' + err
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'post not found'
                })
            }
            res.json(doc)

        }).populate('author')
    } catch (err) {
        res.status(500).json({
            message: 'comments.getOne error: ' + err
        })
    }
}


export const create = async (req, res, next) => {
    try {
        const doc = new CommentModel({
            text: req.body.text,
            postId: req.body.postId,
            author: req.userId,
            createdAt: new Date(),
        })

        const comment = await doc.save()

        PostModel.findOneAndUpdate({
            _id: req.body.postId
        }, {
            $push: {comments: comment._id}
        }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message: 'posts.getOne error: ' + err
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'post not found'
                })
            }
            res.json(comment)
        })


    } catch (err) {
        next(
            res.status(500).json({
                message: 'comments.create error: ' + err
            })
        )
    }
}


export const remove = async (req, res, next) => {
    try {
        const comment = await CommentModel.findOneAndRemove({
            _id: req.params.id
        })

        console.log(comment.postId)

        const post = await PostModel.findByIdAndUpdate(
            comment.postId,
            {
                $pull: {comments: req.params.id}
            }, {
                new: true
            }
        )

        res.json({success: true})

    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}


export const update = async (req, res, next) => {
    try {
        const doc = await CommentModel.findByIdAndUpdate(
            req.params.id,
            {
                text: req.body.text,
                updatedAt: new Date(),
            }, {
                new: true
            })

        res.json(doc)
    } catch (err) {
        next(
            res.status(500).json({
                message: 'comments.update error: ' + err
            })
        )
    }
}


export const getPostComments = async (req, res, next) => {
    try {
        const comments = await CommentModel.find().populate('author').limit(5).exec()

        res.json(comments)
    } catch (err) {
        next(
            res.status(500).json({
                message: 'posts.getLastComments error: ' + err
            })
        )

    }
}

export const getLastComments = async (req, res, next) => {
    try {
        const comments = await CommentModel.find().populate('author').limit(5).exec()

        res.json(comments)
    } catch (err) {
        next(
            res.status(500).json({
                message: 'posts.getLastComments error: ' + err
            })
        )

    }
}