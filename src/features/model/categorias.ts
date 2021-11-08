const categoriasConnection = require('../../database/connection')

async function insertCategorias(nome: any, descricao: any){

    const sql = `INSERT INTO community.categorias(nome, descricao) VALUES($1, $2) RETURNING categorias.id_categorias, categorias.nome, categorias.descricao`
    const values = [nome, descricao]

    try {

        const res = await categoriasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

async function selectOneCategorias(id_categorias: any){

    const sql = `SELECT * FROM community.categorias WHERE id_categorias = $1`
    const values = [id_categorias]

    try {

        const res = await categoriasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

async function selectAllCategorias(){

    const sql = `SELECT * FROM community.categorias`

    try {

        const res = await categoriasConnection.client.query(sql);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

async function updateCategorias(id_categorias: any, nome: any, descricao: any){

    const sql = `UPDATE community.categorias SET nome = $1, descricao = $2 
                    WHERE id_categorias = $3 RETURNING nome, descricao`
    const values= [nome, descricao, id_categorias]

    try {

        const res = await categoriasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

module.exports = {insertCategorias, selectAllCategorias, selectOneCategorias, updateCategorias}