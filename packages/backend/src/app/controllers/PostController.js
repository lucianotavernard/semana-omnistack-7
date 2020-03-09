import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

import Post from '../models/Post'

export default {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt')

    return res.json(posts)
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body
    const { filename: image } = req.file

    const [name] = image.split('.')
    const filename = `${name}.jpg`

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', filename))

    fs.unlinkSync(req.file.path)

    const post = await Post.create({
      place,
      author,
      hashtags,
      description,
      image: filename,
    })

    req.io.emit('post', post)

    return res.json(post)
  },
}
