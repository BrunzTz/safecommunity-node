import { Request, Response } from 'express';

const ajudasModel = require("../model/ajudas");

export default {

    async insert(request: Request, response: Response){

        const{
            id_usuario_auxiliado
        } = request.params
        const{
            id_categoria,
            id_subcategoria,
            comentario,
            status
        } = request.body

        try {

            const [ajuda] = await ajudasModel.insertAjuda(id_usuario_auxiliado, id_categoria, id_subcategoria, comentario, status)

            const retorno = {
                status: 200,
                mensagem: "Cadastro realizado com sucesso",
                ajuda: ajuda
            }
            response.json(retorno)
    
        } catch(err) {

            const msg = {
                message: "Não foi possivel cadastrar ajuda",
                erro: err
            }
            response.json(msg)
        }
    },

    async listOne(request: Request, response: Response){

        const{
            id_ajuda
        } = request.params

        try {

            const ajuda = await ajudasModel.listOneAjuda(id_ajuda)

            const retorno = {
                status: 200,
                ajuda: ajuda
            }
            response.json(retorno)
    
        } catch(err) {

            const msg = {
                message: "Ajuda, não encontrada",
                erro: err
            }
            response.json(msg)
        }
    }
}