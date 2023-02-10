import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        tags: {
            type: Array,
            default: [String]
        },
        viewsCount: {
            type: Number,
            default: 0
        },
        imageUrl: {
            type: String
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Comment',
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

export default mongoose.model('Post', PostSchema)