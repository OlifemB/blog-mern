import {PostModel} from "../models/index.js";

export const getLastTags = async (req, res, next) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map(item => item.tags).flat().slice(0, 5)
        res.json(tags)
    } catch (err) {
        next(
          res.status(500).json({
              message: 'posts.getAll error: ' + err
          })
        )

    }
}

export const getAll = async (req, res, next) => {
    try {
        const posts = await PostModel.find().populate('author').exec()

        res.json(posts)
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
        const postId = req.params.id

        PostModel.findOneAndUpdate({
            _id: postId
        }, {
            $inc: {viewsCount: 1}
        }, {
            returnDocument: 'after'
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
            tags: req.body.tags.split(' '),
            author: req.userId
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
        const postId = req.params.id

        await PostModel.findOneAndDelete({
              _id: postId
          },
          (err, doc) => {
              if (err) {
                  return res.status(500).json({
                      message: 'Post delete error: ' + err
                  })
              }

              if (!doc) {
                  return res.status(404).json({
                      message: 'Cant find post by id: ' + postId
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
        const postId = req.params.id

        await PostModel.updateOne({
              _id: postId
          },
          {
              title: req.body.title,
              text: req.body.text,
              imageUrl: req.body.imageUrl,
              tags: req.body.tags.split(' '),
              author: req.userId

          })

        res.json({
            success: true,
        })
    } catch (err) {
        next(
          res.status(500).json({
              message: 'Post update error: ' + err
          })
        )
    }
}