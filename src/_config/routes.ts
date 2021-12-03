import { Router } from "express";
const routes = Router();

import userController from '../features/controller/userController';
import habilidadesController from '../features/controller/habilidadesController'
import categoriasController from '../features/controller/categoriasController'
import subcategoriasController from '../features/controller/subcategoriasController'
import ajudasController from '../features/controller/ajudasController'
import classificacoesController from "../features/controller/classificacoesController";

//USUÁRIO
//visualizar usuários
routes.get('/api/user', userController.listAll)
routes.get('/api/user/:id_pessoa', userController.viewUser)
//cadastrar um usuário
routes.post('/api/user', userController.insertPerson)
//login
routes.post('/api/auth', userController.authPerson)
//atualizar dados de um usuário
routes.put('/api/user/:id_pessoa', userController.updateDados)

//CATEGORIAS
//visualizar categorias
routes.get('/api/categorias', categoriasController.selectAllCategorias)
routes.get('/api/categorias/:id_categorias', categoriasController.selectOneCategorias)
//inserir categorias
routes.post('/api/categorias', categoriasController.insertCategorias)
//atualizar categorias
routes.put('/api/categorias/:id_categorias', categoriasController.updateCategorias)

//SUBCATEGORIAS
//visualizar subcategorias
routes.get('/api/subcategorias', subcategoriasController.selectAllSubcategorias)
routes.get('/api/subcategorias/:id_subcategorias', subcategoriasController.selectOneSubcategorias)
//inserir subcategorias
routes.post('/api/subcategorias/:id_categorias', subcategoriasController.insertSubcategorias)
//Atualizar subcategorias
routes.put('/api/subcategorias/:id_subcategorias', subcategoriasController.updateSubcategorias)
//Deletar subcategorias
routes.delete('/api/subcategorias/:id_subcategorias', subcategoriasController.deleteSubcategorias)

//HABILIDADES
//Visualizar habilidades
routes.get('/api/habilidades/:id_usuario', habilidadesController.selectAllHabilidades)
routes.get('/api/habilidades/one/:id_habilidades', habilidadesController.selectOneHabilidades)
//inserir uma nova habilidade para o usuário
routes.post('/api/habilidades/:id_usuario', habilidadesController.insertHabilidades)
//atualizar uma habilidade
routes.put('/api/habilidades/:id_habilidades', habilidadesController.updateHabilidades)
//deletar habilidade
routes.delete('/api/habilidades/:id_habilidades', habilidadesController.deleteHabilidades)

//AJUDAS
//Visualizar ajudas
routes.get('/api/ajudas/:id_ajuda', ajudasController.listOne)
routes.get('/api/ajudas/contribuinte/:id_usuario_contribuinte', ajudasController.listAllPerHelper)
routes.get('/api/ajudas/auxiliado/:id_usuario_auxiliado', ajudasController.listAllPerHelped)
routes.get('/api/ajudas/disponiveis/:id_usuario_auxiliado', ajudasController.listAllAvailable)
routes.get('/api/ajudas/ongoingperhelper/:id_usuario_contribuinte', ajudasController.listAllongoingPerHelper)
routes.get('/api/ajudas/finishedperhelped/:id_usuario_auxiliado', ajudasController.listAllFinishedPerHelped)
routes.get('/api/ajudas/finishedperhelper/:id_usuario_contribuinte', ajudasController.listAllFinishedPerHelper)
routes.get('/api/ajudas/finished/:status', ajudasController.listAllHelpsFinished)
//Inserir ajuda
routes.post('/api/ajudas/:id_usuario_auxiliado', ajudasController.insert)
//Inserir/atualizar ajudante
routes.put('/api/ajudas/contribuinte/:id_usuario_contribuinte', ajudasController.changeContribuinte)
//Atualizar ajuda
routes.put('/api/ajudas/:id_ajuda', ajudasController.update)
//Concluir ajuda
routes.put('/api/ajudas/finish/:id_ajuda', ajudasController.finishHelping)
//Deletar ajuda
routes.delete('/api/ajudas/:id_ajuda', ajudasController.delete)

//Classificacao
routes.get('/api/classificacao/:id_usuario_contribuinte', classificacoesController.listOneClassificacao)
routes.get('/api/classificacao', classificacoesController.listAllClassificacao)

export default routes;