import express from 'express';
import {apiRouter} from "./routes/appRouter.ts";
import {UserService} from "./services/UserService.ts";
import {UserServiceEmbeddedImpl} from "./services/UserServiceEmbeddedImpl.ts";
import {UserController} from "./controllers/UserController.ts";

export const service:UserService = new UserServiceEmbeddedImpl();
export const userController = new UserController(service);

export const launchServer = () => {
const app = express();
app.listen(3005, () => console.log("Server runs at http://localhost:3005"))
    app.use('/api', apiRouter)
}