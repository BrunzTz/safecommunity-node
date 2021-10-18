import routes from './_config/routes';
import cors from 'cors';
import express from 'express';

const app = express();

console.log("App rodando")

app.use(cors())
app.use(express.json());
app.use(routes);


app.listen(3001);