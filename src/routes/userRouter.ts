import express, {Request, Response} from "express";
import {userController} from "../server.ts";
import asyncHandler from "express-async-handler";
import {userDtoSchema} from "../joiSchemas/userDtoSchema.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {myLogger} from "../utils/logger.js";
import {query, validationResult} from "express-validator";

export const userRouter = express.Router()
// api/users?id=122
userRouter.get('/',query('id', "Wrong param id").notEmpty().isNumeric(), asyncHandler((req:Request, res:Response) => {

    if(req.query.id) {
        
        const valRes = validationResult(req);
        if(!valRes.isEmpty()) throw new HttpError(400, JSON.stringify(valRes))
        userController.getUserById(req, res)
    }
    else userController.getAllUsers(req, res);
}))
userRouter.post('/',asyncHandler(async (req, res) => {
    const {error} = userDtoSchema.validate(req.body);
    if(error){
        myLogger.log(error.message)
        throw new HttpError(400, error.message)
    }
    await userController.addUser(req, res);
}))
// userRouter.get('/user', (req, res) => {
//     userController.getUserById(req, res);
// })
userRouter.delete('/', asyncHandler((req, res) => {
    userController.removeUser(req, res)
}))
userRouter.put('/', asyncHandler(async (req, res) => {
    await userController.updateUser(req, res)
}))