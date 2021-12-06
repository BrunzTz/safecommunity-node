# Introduction 
O projeto foi criado em Node utilizando a versão 14.17.5.

# Getting Started
Guia de como começar a visualização do front-end do SafeCommunity:
1. Instalando dependencias
        `npm install`

2. Dependencias do Software
        `node`
        `npm`
        `postgres`

## Development server

Rodar a API utilizando o comando `npm start`.

## Configuration Database

1. O projeto utiliza o PostgreSQL como base de dados
2. O script do banco já está junto com os arquivos. O arquivo de script se chama: `Script - SafeCommunity.txt`
3. Para que a API obtenha acesso a sua base de dados, acesse o arquivo `src/database/connection.ts` e depois altere os seguintes campos com as informações da sua base de dados:


`const client = new Client({`
`    user: 'postgres', -- Usuário do banco de dados`
`    host: 'localhost', -- Instância do servidor`
`    database: 'postgres', -- Nome do banco de dados`
`    password: 'postgres', -- Senha do banco de dados`
`    port: 5432  -- Porta do banco de dados`
`});`
