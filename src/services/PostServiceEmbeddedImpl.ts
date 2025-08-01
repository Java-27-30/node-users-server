import {PostService} from "./PostService.js";
import {Post} from "../model/postTypes.js";
import {HttpError} from "../errorHandler/HttpError.js";

export class PostServiceEmbeddedImpl implements PostService{
    private posts:Post[] = [];

    addPost(post: Post): boolean {
        const index = this.posts.findIndex(item => item.id === post.id);
        if(index !== -1)
        return false;
        this.posts.push(post);
        console.log([...this.posts]);
        return true;
    }

    getAllUserPosts(userId: number): Post[] {
        return this.posts.filter(item => item.userId === userId);
    }

    getPost(id: number): Post {
        const index = this.posts.findIndex(item => item.id === id);
       // if(index === -1) throw new Error(JSON.stringify({status: 404, message: "Post not found"}));
        if(index === -1){
            console.log((this.posts)[index].id)
            throw new HttpError(404, "Post not found");
        }
        return this.posts[index]
    }

    removePost(id: number): Post {
        const index = this.posts.findIndex(item => item.id === id);
        console.log(index);
        if(index === -1) throw new Error("Post not found");
        return this.posts.splice(index, 1)[0]
    }

    updatePost(post: Post): boolean {
        const index = this.posts.findIndex(item => item.id === post.id);
        if(index === -1)
            return false;
        this.posts[index] = post;
        console.log([...this.posts]);
        return true;
    }

    getAllPosts(): Post[] {
        return [...this.posts];
    }


}