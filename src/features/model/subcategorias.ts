const subcategoriasConnection = require('../../database/connection')

async function insertSubcategorias(id_categorias: any, nome: any, descricao: any){

    const sql = `INSERT INTO community.subcategorias(id_categorias, nome, descricao) VALUES($1, $2, $3) RETURNING subcategorias.id_subcategorias, subcategroias.id_categorias, subcategorias.nome, subcategorias.descricao`
    const values = [id_categorias, nome, descricao]

    try {

        const res = await subcategoriasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function selectOneSubcategorias(id_subcategorias: any){

    const sql = `SELECT * FROM community.subcategorias WHERE subcategorias.id_subcategorias = $1`
    const values = [id_subcategorias]

    try {

        const res = await subcategoriasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function selectAllSubcategorias(){

    const sql = `SELECT * FROM community.subcategorias`

    try {

        const res = await subcategoriasConnection.client.query(sql);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function updateSubcategorias(id_subcategorias: any, nome: any, descricao: any) {

    const sql = `UPDATE community.subcategorias SET nome = $1, descricao = $2 WHERE id_subcategorias = $3 RETURNING nome, descricao`
    const values = [nome, descricao, id_subcategorias]

    try {

        const res = await subcategoriasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
    
}

async function deleteSubcategorias(id_subcategorias: any){

    const sql = `DELETE FROM community.subcategorias WHERE subcategorias.id_subcategorias = $1`
    const values = [id_subcategorias]

    try {

        const res = await subcategoriasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

module.exports = {insertSubcategorias, selectOneSubcategorias, selectAllSubcategorias, updateSubcategorias, deleteSubcategorias}