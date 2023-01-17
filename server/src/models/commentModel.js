import mongoose from "mongoose";

const CommentModel = new mongoose.Schema({
      text: {
          type: String,
          required: true
      },
      // post: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: 'Post',
      //     required: true
      // },
      author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
      },
      createAt: {
          type: String,
          required: Date
      }
  },
  {
      timeStamps: true
  }
)

export default mongoose.model('Comment', CommentModel)