const habilidadesConnection = require('../../database/connection')

async function insertHabilidades(id_usuario: any, nome: any, descricao: any){

    const sql = `INSERT INTO community.habilidades (id_usuario, nome, descricao) 
                    VALUES ($1, $2, $3) 
                    RETURNING id_habilidades, nome, descricao`
    const values = [id_usuario, nome, descricao]

    try {

        const res = await habilidadesConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function deleteHabilidades(id_habilidades: any){

    const sql = `DELETE FROM community.habilidades WHERE habilidades.id_habilidades = $1`
    const values = [id_habilidades]

    try {

        const res = await habilidadesConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function selectOneHabilidades(id_habilidades: any){

    const sql = `SELECT habilidades.id_habilidades, habilidades.nome, habilidades.descricao 
                    FROM community.habilidades WHERE habilidades.id_habilidades = $1`
    const values = [id_habilidades]

    try {

        const res = await habilidadesConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function selectAllHabilidades(id_usuario: any){

    const sql = `SELECT habilidades.id_habilidades, habilidades.nome, habilidades.descricao 
                    FROM community.habilidades WHERE habilidades.id_usuario = $1`
    const values = [id_usuario]

    try {

        const res = await habilidadesConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function updateHabilidades(id_habilidades: any, nome: any, descricao: any) {
    
    const sql = `UPDATE community.habilidades SET nome = $1, descricao = $2 WHERE id_habilidades = $3 RETURNING nome, descricao`
    const values = [nome, descricao, id_habilidades]

    try {

        const res = await habilidadesConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}



module.exports = {insertHabilidades, deleteHabilidades, selectOneHabilidades, selectAllHabilidades, updateHabilidades}