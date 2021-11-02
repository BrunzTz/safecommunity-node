const ajudasConnection = require("../../database/connection")

async function listOneAjuda(id_ajuda: any){

    const sql1 = `SELECT ajuda.id_ajuda, ajuda.comentario, ajuda.status, subcategorias.nome as subcategoria_nome, categorias.nome as categoria_nome, 
                usuario.id_usuario as id_usuario
                FROM community.ajuda LEFT OUTER JOIN community.categorias on categorias.id_categorias = ajuda.id_categoria
                LEFT OUTER JOIN community.subcategorias on subcategorias.id_subcategorias = ajuda.id_subcategoria
                LEFT OUTER JOIN community.usuario on usuario.id_usuario = ajuda.id_usuario_auxiliado
                WHERE ajuda.id_ajuda = $1;`
    const values1 = [id_ajuda]
    
    try {

        const resAjuda = await ajudasConnection.client.query(sql1, values1)

        const sql2 = `SELECT pessoa.nome as nomePessoa, pessoa.email, pessoa.id_pessoa FROM community.usuario
                LEFT OUTER JOIN community.pessoa on pessoa.id_pessoa = usuario.id_pessoa
                LEFT OUTER JOIN community.ajuda on ajuda.id_usuario_auxiliado = usuario.id_usuario
                WHERE usuario.id_usuario = $1;`
        const [ajuda] = resAjuda.rows
        const values2 = [ajuda.id_usuario]

        try{
            const resUsuario = await ajudasConnection.client.query(sql2, values2)

            const retorno = {
                ajuda: ajuda,
                usuario_auxiliado: resUsuario.rows[1]
            }

            return (retorno);

        }catch (err){
            console.log(err)
        }

    }catch (err) {
        console.error(err);
    }
}

async function insertAjuda(id_usuario_auxiliado: any, id_categoria: any, id_subcategoria: any, comentario: any, status: any){

    const sql = `INSERT INTO community.ajuda
                (id_usuario_auxiliado, id_categoria, id_subcategoria, comentario, status)
                VALUES ($1, $2, $3, $4, $5) RETURNING id_ajuda`
    const values = [id_usuario_auxiliado, id_categoria, id_subcategoria, comentario, status]

    try {

        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        console.error(err);
    }
}

module.exports = { insertAjuda, listOneAjuda }