import { Request, Response } from 'express';

const categoriasModel = require('../model/categorias');

export default{

    async insertCategorias(request: Request, response: Response){

        const{
            nome,
            descricao
        } = request.body

        try {

            const [categorias] = await categoriasModel.insertCategorias(nome, descricao)
            response.json(categorias)
    
        } catch(err) {

            const msg = {
                message: "Não foi possível cadastrar categoria"
            }
            response.json(msg.message)
        }
        
    },

    async selectOneCategorias(request: Request, response: Response){

        const{
            id_categorias
        } = request.params

        try {

            const [categorias] = await categoriasModel.selectOneCategorias(id_categorias)
            response.json(categorias)
    
        } catch(err) {

            const msg = {
                message: "Não foi possível encontrar a categoria"
            }
            response.json(msg.message)
        }
    },

    async selectAllCategorias(request: Request, response: Response){

        try {

            const categorias = await categoriasModel.selectAllCategorias()
            response.json(categorias)
    
        } catch(err) {

            const msg = {
                message: "Não foi possível encontrar categorias"
            }
            response.json(msg.message)
        }
    },

    async updateCategorias(request: Request, response: Response){

        const{
            nome,
            descricao
        } = request.body

        const{
            id_categorias
        } = request.params

        try {

            const [categorias] = await categoriasModel.updateCategorias(id_categorias, nome, descricao)
            response.json(categorias)
    
        } catch(err) {

            const msg = {
                message: "Não foi possível atualizar categoria"
            }
            response.json(msg.message)
        }
    }
}