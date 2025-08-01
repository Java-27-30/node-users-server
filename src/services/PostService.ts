import {Post} from "../model/postTypes.js";

export interface PostService {
    addPost:(post: Post) => boolean;
    removePost: (id:number) => Post;
    updatePost: (post:Post) => boolean;
    getPost: (id:number) => Post;
    getAllUserPosts: (userId:number) => Post[];
    getAllPosts: () => Post[];

}