import { Request, Response } from 'express';

const subcategoriasModel = require('../model/subcategorias');

export default{

    async insertSubcategorias(request: Request, response: Response){

        const{
            nome,
            descricao
        } = request.body
        
        const{
            id_categorias
        } = request.params

        try{

            const [subcategorias] = await subcategoriasModel.insertSubcategorias(id_categorias, nome, descricao)
            response.json(subcategorias)

        }catch(err) {

            const msg = {
                message: "Não foi possível cadastrar subcategoria"
            }
            response.json(msg.message)
        }
    },

    async selectOneSubcategorias(request: Request, response: Response){

        const{
            id_subcategorias
        } = request.params

        try{

            const [subcategorias] = await subcategoriasModel.selectOneSubcategorias(id_subcategorias)
            response.json(subcategorias)

        }catch(err) {

            const msg = {
                message: "Não foi possível encontrar subcategoria"
            }
            response.json(msg.message)
        }
    },

    async selectAllSubcategorias(request: Request, response: Response){

        try{

            const subcategorias = await subcategoriasModel.selectAllSubcategorias()
            response.json(subcategorias)

        }catch(err) {

            const msg = {
                message: "Não foi possível encontrar subcategorias"
            }
            response.json(msg.message)
        }
    },

    async updateSubcategorias(request: Request, response: Response){

        const{
            nome,
            descricao
        } = request.body

        const{
            id_subcategorias
        } = request.params

        try{

            const [subcategorias] = await subcategoriasModel.updateSubcategorias(id_subcategorias, nome, descricao)
            response.json(subcategorias)

        }catch(err) {

            const msg = {
                message: "Não foi possível atualizar subcategoria"
            }
            response.json(msg.message)
        }
    },

    async deleteSubcategorias(request: Request, response: Response){

        const{
            id_subcategorias
        } = request.params

        try{

            const [subcategorias] = await subcategoriasModel.deleteSubcategorias(id_subcategorias)
            response.json(subcategorias)

        }catch(err) {

            const msg = {
                message: "Não foi possível deletar subcategoria"
            }
            response.json(msg.message)
        }
    }
}