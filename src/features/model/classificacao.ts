const classConnection = require('../../database/connection')

async function listOneClassificacao(id_usuario_contribuinte: any){

    const sql = `SELECT * FROM community.classificacoes WHERE classificacoes.id_usuario_contribuinte = $1;`
    const values = [id_usuario_contribuinte]

    try{

        const classificacao = await classConnection.client.query(sql, values);
        return classificacao.rows;

    } catch(err){
        console.log(err)
    }
}

async function listAllClassificacao(){
    
    const sql = `SELECT * FROM community.classificacoes;`

    try{

        const classificacao = await classConnection.client.query(sql);
        return classificacao.rows;

    } catch(err){
        console.log(err)
    }
}

module.exports = { listAllClassificacao, listOneClassificacao }