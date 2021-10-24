import { Client } from 'pg';
const certificado = require('../database/ssl')

const client = new Client({
    user: 'brunorocha@safe-community',
    host: 'safe-community.postgres.database.azure.com',
    database: 'postgres',
    password: 'bruno@1999',
    port: 5432,
    ssl: {
        cert: certificado.cert,
        rejectUnauthorized: true,
    },
});

async function connect(){

    const connection = await client.connect().catch(e => { console.log(e) });
    console.log("Conectou no Postgres!");
    return connection;
}

connect();

module.exports = {connect, client}