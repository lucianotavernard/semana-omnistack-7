import { Router } from 'express'

import multer from 'multer'
import uploadConfig from './config/multer'

import PostController from './app/controllers/PostController'
import LikeController from './app/controllers/LikeController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/posts', PostController.index)
routes.post('/posts', upload.single('image'), PostController.store)

routes.post('/posts/:id/like', LikeController.store)

export default routes
