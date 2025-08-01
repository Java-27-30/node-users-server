import express, {Request, Response} from "express";
import * as controller from '../controllers/postController.js'
import {Post} from "../model/postTypes.js";
import {convertPostDto, parseBody} from "../utils/tools.ts";

export const postRouter = express.Router();

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
    const postDto = await parseBody(req);
    const post:Post|null = convertPostDto(postDto);
    if(!post)
        res.status(400).send('Bad request')
    req.body = post as Post;
     controller.updatePost(req, res);
})

postRouter.post('/', async (req:Request, res:Response) => {
    const postDto = await parseBody(req);
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
