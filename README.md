# Introduction 
O projeto foi criado em Node utilizando a versão 14.17.5.

# Getting Started
 Guia de como começar a visualização do front-end do SafeCommunity:
1.	Instalando dependencias
        `npm install`

2.	Dependencias do Software
        `node`
        `npm`
        `postgres`

## Development server

Rodar o node utilizando o comando `npm start`.

## Configuration Database

Acessar o arquivo `src/database/connection.ts`
```
const client = new Client({
    user: 'postgres', -- Usuário do banco de dados
    host: 'localhost', -- Instância do servidor
    database: 'postgres', -- Nome do banco de dados
    password: 'postgres', -- Senha do banco de dados
    port: 5432  -- Porta do banco de dados
});
```