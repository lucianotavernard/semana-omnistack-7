import { Schema, model } from 'mongoose'

const PostSchema = new Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
)

PostSchema.virtual('url').get(function() {
  return `http://localhost:3333/files/${encodeURIComponent(this.image)}`
})

export default model('Post', PostSchema)
