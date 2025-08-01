import express, {Request, Response, NextFunction} from "express";
import * as controller from '../controllers/postController.js'
import {Post} from "../model/postTypes.js";
import {convertPostDto, parseBody} from "../utils/tools.ts";
import {myLogger} from "../utils/logger.ts";

export const postRouter = express.Router();

postRouter.use((req:Request, res:Response, next:NextFunction) => {
    myLogger.log(`Request "api/posts${req.url}" was recieved`)
    next();
})
postRouter.use((req:Request, res:Response, next:NextFunction) => {
    myLogger.save(`Request "api/posts${req.url}" was recieved`)
    next();
})

postRouter.get('/user/:userId', (req:Request, res:Response) => {
    try {
      controller.getUserPost(req, res);
    } catch (e) {
        res.status(400).send('Bad request')
    }

})

postRouter.delete('/post/:id', (req:Request, res:Response) => {
    const id = req.params.id;
    if(!id)
        res.status(400).send('Bad request')
    controller.removePost(req, res);
    }
)
postRouter.put('/', async (req:Request, res:Response) => {
    const postDto = req.body;
    const post:Post|null = convertPostDto(postDto);
    if(!post)
        res.status(400).send('Bad request')
    req.body = post as Post;
     controller.updatePost(req, res);
})

postRouter.post('/', async (req:Request, res:Response) => {
    //const postDto = await parseBody(req);
    const postDto = req.body;
    const post: Post | null = convertPostDto(postDto);
    if (!post)
        res.status(400).send('Bad request')
    req.body = post as Post;
        controller.addPost(req, res);
})
postRouter.get('/',(req:Request, res:Response) => {
    const result:Post[] = controller.getAllPosts();
    res.type("application/json").send(JSON.stringify(result))
})
//http://localhost:3005/api/posts/post/2/user/5
postRouter.get('/post/:id',(req:Request, res:Response) => {
    const {id} = req.params;
    if(!id)
        res.status(404).send("Post not found")
    controller.getPostById(req, res);
})

postRouter.get('/user', (req:Request, res:Response) => {
    const {userName} = req.query
    if(!userName || typeof userName !== "string")
        res.status(400).send(`Bad request: userName required`)
        controller.getUserPostsByName(req, res);
})
