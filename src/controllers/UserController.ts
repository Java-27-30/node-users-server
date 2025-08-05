import {UserService} from "../services/UserService.ts";
import {isUserType, parseBody} from "../utils/tools.ts";
import {User} from "../model/userTypes.ts";
import {Request, Response} from 'express';
import {baseUrl} from "../config/userServerConfig.ts";
import {myLogger} from "../utils/logger.ts";
import {HttpError} from "../errorHandler/HttpError.js";

export class UserController {
    constructor(private userService: UserService) {
    }

    async addUser(req: Request, res: Response) {

        if (!isUserType(req.body)) {
            res.writeHead(400, {'Content-Type': 'text/html'})
            res.end('Bad request: wrong params!')
            myLogger.log('Wrong params!')
            return;
        }
        const user = req.body as User;
        this.userService.addUser(user);
        res.status(201).send("User successfully added")
    }

    removeUser(req: Request, res: Response) {
        const url = new URL(req.url!, baseUrl);
        const param = url.searchParams.get('id');

        if (!param || Number.isNaN(parseInt(param))) {
            res.writeHead(400, {'Content-Type': 'text/html'})
            res.end('Bad request: wrong params!')
            myLogger.log('Wrong params!')
        }
        const id = parseInt(param!)
        const removed = this.userService.removeUser(id);
        myLogger.log(`User with id ${id} was removed from DB`);
        myLogger.save(`User with id ${id} was removed from DB`);
        res.json(removed);
    }

    getAllUsers(req: Request, res: Response) {
        const result = this.userService.getAllUsers();
        res.json(result)
        myLogger.log(`All users responsed`);
    }

    getUserById(req: Request, res: Response) {
        const param = req.params.id;
        // const url = new URL(req.url!, baseUrl);
        // const param = url.searchParams.get('id');
        // if (!param || Number.isNaN(parseInt(param))) {
        //     myLogger.log('Wrong params!');
        //     throw new HttpError(400, "Wrong params!")
        // }
            const user = this.userService.getUserById(parseInt(param!));
            res.json(user)
            myLogger.log(`User responsed`);
        }

    async updateUser(req: Request, res: Response) {
        const body = req.body as User;
            this.userService.updateUser(body);
            res.send('User was successfully updated');
            myLogger.log(`User with id ${body.id} was updated`);
    }
}