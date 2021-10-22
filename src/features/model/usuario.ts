const connection = require('../../database/connection')

async function listAll(){

    const sql = `SELECT * FROM clinica.pessoa;`

    try {

        const res = await connection.client.query(sql);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
    
}

async function listOne(id: any){

    const sql = `SELECT * FROM clinica.pessoa WHERE pessoa.id_pessoa = $1;`
    const values = [id]
    
    try {

        const res = await connection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}


module.exports = {listAll, listOne}