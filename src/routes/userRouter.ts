import express from "express";
import {userController} from "../server.ts";

export const userRouter = express.Router()
// api/users?id=122
userRouter.get('/', (req, res) => {
    if(req.query.id) userController.getUserById(req, res)
    else userController.getAllUsers(req, res);
})
userRouter.post('/',async (req, res) => {
    await userController.addUser(req, res);
})
// userRouter.get('/user', (req, res) => {
//     userController.getUserById(req, res);
// })
userRouter.delete('/', (req, res) => {
    userController.removeUser(req, res)
})
userRouter.put('/', async (req, res) => {
    await userController.updateUser(req, res)
})