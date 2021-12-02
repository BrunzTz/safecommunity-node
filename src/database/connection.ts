import { Client } from 'pg';
const certificado = require('../database/ssl')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432
});

async function connect(){

    const connection = await client.connect().catch(e => { console.log(e) });
    console.log("Conectou no Postgres!");
    return connection;
}

connect();

module.exports = {connect, client}