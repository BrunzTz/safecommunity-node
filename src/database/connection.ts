import { Client } from 'pg';

const client = new Client({
    user: 'brunorocha@consul-med',
    host: 'consul-med.postgres.database.azure.com',
    database: 'postgres',
    password: 'bruno@1999',
    port: 5432
});

async function connect(){

    const connection = await client.connect().catch(e => { console.log(e) });
    console.log("Conectou no Postgres!");
    return connection;
}

connect();

module.exports = {connect, client}