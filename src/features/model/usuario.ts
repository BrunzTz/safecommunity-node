const usuarioConnection = require('../../database/connection')

async function listAll(){

    const sql = `SELECT pessoa.id_pessoa, pessoa.nome, pessoa.endereco, pessoa.data_nasc 
                    FROM community.usuario 
                    LEFT OUTER JOIN community.pessoa on usuario.id_pessoa = pessoa.id_pessoa;`

    try {

        const res = await usuarioConnection.client.query(sql);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function viewUser(id_pessoa: any){

    const sql = `SELECT pessoa.nome as nomePessoa, pessoa.endereco, pessoa.data_nasc
                FROM community.usuario LEFT OUTER JOIN community.pessoa on pessoa.id_pessoa = usuario.id_pessoa 
                WHERE pessoa.id_pessoa = $1`          
    const values = [id_pessoa]

    try {
        const res = await usuarioConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function insertPerson(nome: any, endereco: any, telefone: any, cpf: any, sexo: any, data_nasc: any, email: any, senha: any){

    const sql = `INSERT INTO community.pessoa (nome, endereco, telefone, cpf, sexo, data_nasc, email, senha) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING pessoa.id_pessoa`
    const values = [nome, endereco, telefone, cpf, sexo, data_nasc, email, senha]

    try {

        const res = await usuarioConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function insertUser(id_pessoa: string){

    const sql = `INSERT INTO community.usuario (id_pessoa) VALUES ($1) RETURNING usuario.id_usuario`
    const values = [id_pessoa]

    try {

        const res = await usuarioConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function authPerson(email:any, senha: any){

    const sql = `SELECT pessoa.id_pessoa FROM community.pessoa WHERE pessoa.email = $1 and pessoa.senha = $2`
    const values = [email, senha]

    try {

        const res = await usuarioConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function authUser(id_pessoa: any){

    const sql = `SELECT usuario.id_usuario, pessoa.id_pessoa, pessoa.nome, pessoa.cpf, pessoa.endereco, pessoa.sexo, pessoa.data_nasc, pessoa.email 
                    FROM community.usuario 
                    LEFT OUTER JOIN community.pessoa ON pessoa.id_pessoa = usuario.id_pessoa 
                    WHERE usuario.id_pessoa = $1`
    const values = [id_pessoa]

    try {

        const res = await usuarioConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

async function updateDados(nome: any, endereco: any, telefone: any, sexo: any, email: any, id_pessoa: any){

    const sql = `UPDATE community.pessoa SET nome = $1, endereco = $2, telefone = $3, sexo = $4, email = $5
                    WHERE id_pessoa = $6 RETURNING nome, endereco, telefone`
    const values = [nome, endereco, telefone, sexo, email, id_pessoa]

    try {

        const res = await usuarioConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

module.exports = {listAll, insertPerson, insertUser, viewUser, authPerson, authUser, updateDados}