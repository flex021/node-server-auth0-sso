import express from 'express'
import { userController } from '~/controllers/userController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/private/hook/login')
  .post(authMiddleware.auth0JwtCheck, userController.hookLogin)

Router.route('/private/get_all')
  .get(authMiddleware.auth0JwtCheck, userController.getAll)

Router.route('/public/get_all')
  .get(userController.getAll)

Router.route('/public/delete/:email')
  .delete(userController.deleteByEmail)

export const userRoute = Router
