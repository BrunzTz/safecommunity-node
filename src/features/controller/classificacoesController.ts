import { Request, Response } from 'express';

const classModel = require("../model/classificacao");

export default {

    async listOneClassificacao(request: Request, response: Response){

        const{
            id_usuario_contribuinte
        } = request.params

        try{

            const classificacao = await classModel.listOneClassificacao(id_usuario_contribuinte)
            const retorno = {
                status: 200,
                classificacao: classificacao
            }

            response.json(retorno)

        } catch(err){

            const msg = {
                mensagem: "Não foi possível listar classificação",
                error: err
            }

            response.json(msg)
        }
    },

    async listAllClassificacao(request: Request, response: Response){

        try{

            const classificacao = await classModel.listAllClassificacao()
            const retorno = {
                status: 200,
                classificacao: classificacao
            }

            response.json(retorno)

        } catch(err){

            const msg = {
                mensagem: "Não foi possível listar classificação",
                error: err
            }

            response.json(msg)
        }
        
    }
}