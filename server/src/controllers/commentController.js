import {CommentModel} from '../models/index.js'


export const getAll = async (req, res, next) => {
    try {
        const comments = await CommentModel.find().populate('author').exec()

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
        const commentId = req.params.id

        CommentModel.findOne({
            _id: commentId
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
        }).populate('user')
    } catch (err) {
        next(
          res.status(500).json({
              message: 'comments.getOne error: ' + err
          })
        )
    }
}


export const create = async (req, res, next) => {
    try {
        const date = new Date()
        const doc = new CommentModel({
            text: req.body.text,
            author: req.userId,
            createAt: date
        })

        const comment = await doc.save()

        res.json(comment)
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
        const commentId = req.params.id

        CommentModel.findOneAndRemove({
              _id: commentId
          },
          (err, doc) => {
              if (err) {
                  return res.status(500).json({
                      message: err
                  })
              }

              if (!doc) {
                  return res.status(404).json({
                      message: 'Cant find comment by id: ' + commentId
                  })
              }
          })

        res.json({
            message: 'success'
        })
    } catch (err) {
        next(
          res.status(500).json({
              message: 'Comment delete error: ' + err
          })
        )
    }
}


export const update = async (req, res, next) => {
    try {
        const commentId = req.params.id

        await CommentModel.updateOne({
            _id: commentId
        }, {
            text: req.body.text
        })

        res.json({
            message: 'success'
        })
    } catch (err) {
        next(
          res.status(500).json({
              message: 'comments.update error: ' + err
          })
        )
    }
}