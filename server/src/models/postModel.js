import mongoose from "mongoose";

const PostModel = new mongoose.Schema({
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
            default: []
        },
        viewsCount: {
            type: Number,
            default: 0
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        imageUrl: String
    },
    {
        timeStamps: true
    }
)

export default mongoose.model('Post', PostModel)