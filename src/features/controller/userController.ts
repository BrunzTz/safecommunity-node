import { Request, Response } from 'express';

const userModel = require('../model/usuario');

export default {

    async listAll(request: Request, response: Response){

        const users = await userModel.listAll()
        response.json(users)
    },

    async insertPerson(request: Request, response: Response){

        const{
            nome,
            endereco, 
            telefone,
            cpf,
            sexo,
            data_nasc,
            email,
            senha,
        } = request.body

        try {

            const [person] = await userModel.insertPerson(nome, endereco, telefone, cpf, sexo, data_nasc, email, senha)
            const [user] = await userModel.insertUser(person.id_pessoa)

            const retorno = {
                status: 200,
                mensagem: "Cadastro realizado com sucesso",
                user: user
            }
            response.json(retorno)
    
        } catch(err) {

            const msg = {
                message: "Email já cadastrado"
            }
            response.json(msg.message)
        }
    },

    async viewUser(request: Request, response: Response){

        const{
            id_pessoa
        } = request.params

        const user = await userModel.viewUser(id_pessoa)
        response.json(user)
    },

    async authPerson(request: Request, response: Response){

        const{
            email,
            senha
        } = request.body

        try {

            const [person] = await userModel.authPerson(email, senha)
            const user = await userModel.authUser(person.id_pessoa)
            const retorno = {
                status: 200,
                mensagem: "Login realizado com sucesso",
                user: user
            }
            response.json(retorno)

        }catch (err){

            const msg = {
                mensagem: "Usuário não existe"
            }

            response.json(msg.mensagem)
        }
        
    },

    async updateDados(request: Request, response: Response){

        const{
            nome,
            endereco,
            telefone,
            sexo,
            email
        } = request.body

        const{
            id_pessoa
        } = request.params

        try {

            const [person] = await userModel.updateDados(nome, endereco, telefone, sexo, email, id_pessoa)
            response.json(person)

        }catch (err){

            const msg = {
                mensagem: "Usuário não existe"
            }

            response.json(msg.mensagem)
        }
    }
}