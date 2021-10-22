import { Request, Response } from 'express';

const userModel = require('../model/usuario');

export default {

    async listAll(request: Request, response: Response){

        const users = await userModel.listAll()
        response.json(users)
    },

    async listOne(request: Request, response: Response){

        const user = await userModel.listOne(32)
        response.json(user)
    }
}