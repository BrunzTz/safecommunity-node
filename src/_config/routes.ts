import { Router } from "express";
const routes = Router();

import userController from '../features/controller/userController';
import habilidadesController from '../features/controller/habilidadesController'
import categoriasController from '../features/controller/categoriasController'
import subcategoriasController from '../features/controller/subcategoriasController'


//USUÁRIO

//visualizar usuários
routes.get('/user', userController.listAll)
routes.get('/user/:id_pessoa', userController.viewUser)

//cadastrar um usuário
routes.post('/user', userController.insertPerson)
//login
routes.post('/auth', userController.authPerson)

//atualizar dados de um usuário
routes.put('/user/:id_pessoa', userController.updateDados)

//CATEGORIAS

//visualizar categorias
routes.get('/categorias', categoriasController.selectAllCategorias)
routes.get('/categorias/:id_categorias', categoriasController.selectOneCategorias)

//inserir categorias
routes.post('/categorias', categoriasController.insertCategorias)

//atualizar categorias
routes.put('/categorias/:id_categorias', categoriasController.updateCategorias)


//SUBCATEGORIAS

//visualizar subcategorias
routes.get('/subcategorias', subcategoriasController.selectAllSubcategorias)
routes.get('/subcategorias/:id_subcategorias', subcategoriasController.selectOneSubcategorias)

//inserir subcategorias
routes.post('/subcategorias/:id_categorias', subcategoriasController.insertSubcategorias)

//Atualizar subcategorias
routes.put('/subcategorias/:id_subcategorias', subcategoriasController.updateSubcategorias)

//Deletar subcategorias
routes.delete('/subcategorias/:id_subcategorias', subcategoriasController.deleteSubcategorias)


//HABILIDADES

//Visualizar habilidades
routes.get('/habilidades/:id_usuario', habilidadesController.selectAllHabilidades)
routes.get('/habilidades/one/:id_habilidades', habilidadesController.selectOneHabilidades)

//inserir uma nova habilidade para o usuário
routes.post('/habilidades/:id_usuario', habilidadesController.insertHabilidades)

//atualizar uma habilidade
routes.put('/habilidades/:id_habilidades', habilidadesController.updateHabilidades)

//deletar habilidade
routes.delete('/habilidades/:id_habilidades', habilidadesController.deleteHabilidades)


export default routes;