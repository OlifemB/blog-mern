import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
        text: {
            type: String,
            required: true
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: Date,
        updatedAt: Date,
    }, {
        timeStamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)

export default mongoose.model('Comment', CommentSchema)