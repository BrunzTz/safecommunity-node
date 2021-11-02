import { Request, Response } from 'express';

const habilidadesModel = require('../model/habilidades');

export default{

    async insertHabilidades(request: Request, response: Response){

        const{
            nome,
            descricao
        } = request.body
        
        const{
            id_usuario
        } = request.params

        try {

            const [habilidades] = await habilidadesModel.insertHabilidades(id_usuario, nome, descricao)
            response.json(habilidades)
    
        } catch(err) {

            const msg = {
                message: "Não foi possível cadastrar habilidade"
            }
            response.json(msg.message)
        }
    },

    async updateHabilidades(request: Request, response: Response){

        const{
            nome,
            descricao
        } = request.body
        
        const{
            id_habilidades
        } = request.params

        try {

            const [habilidades] = await habilidadesModel.updateHabilidades(id_habilidades, nome, descricao)
            response.json(habilidades)
    
        } catch(err) {

            const msg = {
                message: "Não foi possível atualizar habilidade"
            }
            response.json(msg.message)
        }
    },

    async deleteHabilidades(request: Request, response: Response){

        const{
            id_habilidades
        } = request.params

        try {

            const [habilidades] = await habilidadesModel.deleteHabilidades(id_habilidades)
            const retorno = {
                mensagem: "Habilidade deletada",
                habilidade: habilidades
            }
            response.json(retorno)
    
        } catch(err) {

            const msg = {
                message: "Não foi possível deletar habilidade"
            }
            response.json(msg.message)
        }
    },

    async selectAllHabilidades(request: Request, response: Response){

        const{
            id_usuario
        } = request.params

        try {

            const habilidades = await habilidadesModel.selectAllHabilidades(id_usuario)
            response.json(habilidades)
    
        } catch(err) {

            const msg = {
                message: "Não foi possível encontrar habilidades"
            }
            response.json(msg.message)
        }
    },

    async selectOneHabilidades(request: Request, response: Response){

        const{
            id_habilidades
        } = request.params

        try {

            const [habilidades] = await habilidadesModel.selectOneHabilidades(id_habilidades)
            response.json(habilidades)
    
        } catch(err) {

            const msg = {
                message: "Não foi possível encontrar habilidade"
            }
            response.json(msg.message)
        }
    }
}