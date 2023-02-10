import {CommentModel, PostModel} from "../schemas/index.js";


export const getAll = async (req, res, next) => {
    try {
        const posts = await PostModel.find().populate('author').exec()
        res.json(posts.reverse())
    } catch (err) {
        next(
            res.status(500).json({
                message: 'posts.getAll error: ' + err
            })
        )
    }
}

export const getOne = async (req, res, next) => {
    try {
        const doc = await PostModel.findByIdAndUpdate(req.params.id, {
            $inc: {viewsCount: 1}
        }, {
            returnDocument: 'after'
        }).populate('author').populate({path: 'comments', populate: {path: 'author'}})


        res.json(doc)

    } catch (err) {
        next(
            res.status(500).json({
                message: 'posts.getOne error: ' + err
            })
        )
    }
}


export const create = async (req, res, next) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            author: req.userId,
            createdAt: new Date(),
            comments: [],
        })

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        next(
            res.status(500).json({
                message: 'Post create error: ' + err
            })
        )
    }
}

export const remove = async (req, res, next) => {
    try {
        await CommentModel.remove({
            postId: req.body.postId
        }, (err) => {
            res.json(err)
        })

        await PostModel.findByIdAndDelete(
            req.params.id,
            (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Post delete error: ' + err
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Cant find post by id: ' + req.params.id
                    })
                }
            })

        res.json({
            success: true,
        })
    } catch (err) {
        next(
            res.status(500).json({
                message: 'Post delete error: ' + err
            })
        )
    }
}

export const update = async (req, res, next) => {
    try {
        const filter = {
            _id: req.params.id
        }

        const update = {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            author: req.userId,
            updatedAt: new Date(),
        }

        const doc = await PostModel.updateOne(filter, update, {new: true})

        res.json(doc)
    } catch (err) {
        next(
            res.status(500).json({
                message: 'Post update error: ' + err
            })
        )
    }
}

export const getPostComments = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id,{

            }
            )

        res.json(post.comments)
    } catch (err) {
        res.status(500).json({
            message: 'posts.getLatsTags error: ' + err
        })
    }
}


export const getLastTags = async (req, res, next) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map(item => item.tags).flat().slice(0, 15)
        res.json(tags.filter((el, index) => index === tags.indexOf(el)).reverse())
    } catch (err) {
        next(
            res.status(500).json({
                message: 'posts.getLatsTags error: ' + err
            })
        )

    }
}

export const getByTag = async (req, res, next) => {
    try {
        const posts = await PostModel.find({tags: req.params.id})
        res.json(posts)
    } catch (err) {
        next(
            res.status(500).json({
                message: 'posts.getAll error: ' + err
            })
        )
    }
}