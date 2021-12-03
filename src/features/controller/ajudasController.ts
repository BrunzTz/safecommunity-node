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
            comentario
        } = request.body

        try {

            const [ajuda] = await ajudasModel.insertAjuda(id_usuario_auxiliado, id_categoria, id_subcategoria, comentario)

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
    },

    async update(request: Request, response: Response){

        const{
            id_ajuda
        } = request.params

        const{
            id_categoria,
            id_subcategoria,
            comentario,
            status
        } = request.body

        try{

            const ajuda = await ajudasModel.updateAjuda(id_categoria, id_subcategoria, comentario, status, id_ajuda)
            const retorno = {
                status: 200,
                ajuda: ajuda
            }
            response.json(retorno)

        } catch(err){

            const msg = {
                mensagem: "Não foi possível atualizar ajuda",
                erro: err
            }
            response.json(msg)
        }
    },

    async delete(request: Request, response: Response){

        const{
            id_ajuda
        } = request.params

        try{

            const ajuda = await ajudasModel.deleteAjuda(id_ajuda)
            const retorno = {
                status: 200,
                mensagem: "Ajuda deletada",
                ajuda: ajuda
            }
            response.json(retorno)

        } catch(err){

            const msg = {
                mensagem: "Não foi possível deletar a ajuda",
                erro: err
            }

            response.json(msg)
        }
    },

    async changeContribuinte(request: Request, response: Response){

        const{
            id_usuario_contribuinte
        } = request.params

        const{
            id_ajuda
        } = request.body

        try{

            const ajuda = await ajudasModel.changeContribuinte(id_ajuda, id_usuario_contribuinte)
            const retorno = {
                status: 200,
                mensagem: "Contribuinte atualizado",
                ajuda: ajuda
            }
            response.json(retorno)

        } catch(err){

            const msg = {
                mensagem: "Não foi possível alterar contribuinte",
                erro: err
            }

            response.json(msg)
        }
        
    },

    async listAllPerHelper(request: Request, response: Response){

        const{
            id_usuario_contribuinte
        } = request.params

        try{

            const ajuda = await ajudasModel.listAllAjudaPerHelper(id_usuario_contribuinte)
            const retorno = {
                status: 200,
                ajudas: ajuda
            }

            response.json(retorno)

        } catch(err){

            const msg = {
                mensagem: "Não foi possível selecionar ajudas",
                erro: err
            }

            response.json(msg)
        }
    },

    async listAllPerHelped(request: Request, response: Response){

        const{
            id_usuario_auxiliado
        } = request.params

        try{

            const ajuda = await ajudasModel.listAllAjudaPerHelped(id_usuario_auxiliado)
            const retorno = {
                status: 200,
                ajudas: ajuda
            }

            response.json(retorno)
            
        } catch(err){

            const msg = {
                mensagem: "Não foi possível selecionar ajudas",
                erro: err
            }

            response.json(msg)
        }
    },

    async finishHelping(request: Request, response: Response){

        const{
            id_ajuda
        } = request.params

        const{
            classificacao,
            status
        } = request.body

        try{

            const ajuda = await ajudasModel.finishHelping(id_ajuda, status, classificacao)
            const retorno = {
                status: 200,
                mensagem: "Ajuda concluída",
                ajuda: ajuda
            }

            response.json(retorno)

        } catch(err){

            const msg = {
                mensagem: "Não foi possível atualizar a ajuda",
                erro: err
            }

            response.json(msg)
        }
    },

    async listAllAvailable(request: Request, response: Response){

        const{
            id_usuario_auxiliado
        } = request.params

        try{

            const ajudas = await ajudasModel.listAllAvailable(id_usuario_auxiliado)
            const retorno = {
                status: 200,
                mensagem: "Ajudas encontradas",
                ajudas: ajudas
            }

            response.json(retorno)

        } catch(err){

            const msg = {
                mensagem: "Não foi possível encontrar as ajudaa",
                erro: err
            }

            response.json(msg)
        }
        
    },

    async listAllongoingPerHelper(request: Request, response: Response){

        const{
            id_usuario_contribuinte
        } = request.params

        try{

            const ajudas = await ajudasModel.listAllongoingPerHelper(id_usuario_contribuinte)
            const retorno = {
                status: 200,
                mensagem: "Ajudas encontradas",
                ajudas: ajudas
            }

            response.json(retorno)
        } catch(err){

            const msg = {
                mensagem: "Não foi possível encontrar as ajudaa",
                erro: err
            }

            response.json(msg)
        }
    },

    async listAllFinishedPerHelped(request: Request, response: Response){
        const{
            id_usuario_auxiliado
        } = request.params

        try{

            const ajudas = await ajudasModel.listAllFinishedPerHelped(id_usuario_auxiliado)
            const retorno = {
                status: 200,
                mensagem: "Ajudas encontradas",
                ajudas: ajudas
            }

            response.json(retorno)
        } catch(err){

            const msg = {
                mensagem: "Não foi possível encontrar as ajudaa",
                erro: err
            }

            response.json(msg)
        }
    },

    async listAllFinishedPerHelper(request: Request, response: Response){
        const{
            id_usuario_contribuinte
        } = request.params

        try{

            const ajudas = await ajudasModel.listAllFinishedPerHelper(id_usuario_contribuinte)
            const retorno = {
                status: 200,
                mensagem: "Ajudas encontradas",
                ajudas: ajudas
            }

            response.json(retorno)
        } catch(err){

            const msg = {
                mensagem: "Não foi possível encontrar as ajudaa",
                erro: err
            }

            response.json(msg)
        }
    },

    async listAllHelpsFinished(request: Request, response: Response){

        const{
            status
        } = request.params

        try{

            const ajudas = await ajudasModel.listAllAjudas(status)
            console.log(ajudas)
            const retorno = {
                status: 200,
                mensagem: "Ajudas encontradas",
                ajudas: ajudas
            }

            response.json(retorno)
        } catch(err){

            console.log(err)

            const msg = {
                mensagem: "Não foi possível encontrar as ajudaa",
                erro: err
            }

            response.json(msg)
        }
    }
}