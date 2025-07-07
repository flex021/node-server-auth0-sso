import { StatusCodes } from 'http-status-codes'
const Datastore = require('nedb-promises')
const db = Datastore.create('src/database/db.json')

const hookLogin = async (req, res) => {
  try {
    const newUser = req.body
    const existingUser = await db.findOne({ email: newUser.email })

    if (existingUser) {
      res.status(StatusCodes.OK).json({ message: 'User already exists. Continue login...' })
      return
    }

    const insertedUser = await db.insert(newUser)

    res.status(StatusCodes.CREATED).json(insertedUser)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const getAll = async (req, res) => {
  try {
    const users = await db.find({})

    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const deleteByEmail = async (req, res) => {
  try {
    await db.remove({ email: req.params.email })

    res.status(StatusCodes.OK).json({ message: `User with email: ${req.params.email} deleted successfully.` })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const userController = {
  hookLogin,
  getAll,
  deleteByEmail
}
