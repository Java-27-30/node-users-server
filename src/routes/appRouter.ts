import express from 'express'
import {userRouter} from "./userRouter.ts";
import {loggerRouter} from "./loggerRouter.ts";

export const apiRouter = express.Router();
apiRouter.use('/users', userRouter)
apiRouter.use('/logger', loggerRouter)
