import {userDtoSchema} from "../joiSchemas/userDtoSchema.js";
import Joi, { ObjectSchema } from "joi";
import {NextFunction, Request, Response} from "express";

export const pathValSchema:Record<string, ObjectSchema> = {
    "POST/api/users" : userDtoSchema
}

export const bodyValidation = (pathSchema:Record<string, ObjectSchema>) => {
    return (req:Request, res:Response, next:NextFunction) => {

        if(!req.body) next();
        else if(Object.keys(pathSchema).includes(req.method+req.path)){
            const schema = pathSchema[req.method+req.path];
            const {error} = schema.validate(req.body);
            if(error) res.status(400).send(error.message)
               else next();
        }
        else res.status(400).send("Not validated")
    }
}