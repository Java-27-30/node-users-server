import express, {Request, Response,NextFunction} from 'express';
import {apiRouter} from "./routes/appRouter.ts";
import {UserService} from "./services/UserService.ts";
import {UserServiceEmbeddedImpl} from "./services/UserServiceEmbeddedImpl.ts";
import {UserController} from "./controllers/UserController.ts";
import {UserFilePersistenceService} from "./services/UserFilePersistenceService.ts";
import {myLogger} from "./utils/logger.ts";
import {PostServiceEmbeddedImpl} from "./services/PostServiceEmbeddedImpl.ts";
import {HttpError} from "./errorHandler/HttpError.js";

export const service:UserService = new UserServiceEmbeddedImpl();
export const userController = new UserController(service);
export const postService = new PostServiceEmbeddedImpl()

await (service as unknown as UserFilePersistenceService).restoreDataFromFile();

export const launchServer = () => {
const app = express();
app.listen(3005, () => console.log("Server runs at http://localhost:3005"))
    //=================Middleware=============
    app.use(express.json())
    //===================Router=============
    app.use('/api', apiRouter)

    app.use((req, res) => {
        res.status(400).send("Bad request")
    })

    app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
      //  const error: {status:number, message: string} = JSON.parse(err.message)

        if(err instanceof HttpError)
        res.status(err.status).send(err.message)
        else
            res.status(500).send("Unknown server error!")
    })


    process.on('SIGINT', () => {
       (service as unknown as UserFilePersistenceService).saveDataToFile().then(r => {
            myLogger.log("Data saved");
            myLogger.saveToFile("Server shutdown by Ctrl+C")
       });
    })
}