const ajudasConnection = require("../../database/connection")


async function listOneAjuda(id_ajuda: any){

    const sql1 = `SELECT ajuda.id_ajuda, ajuda.comentario, ajuda.status, subcategorias.nome as subcategoria_nome, categorias.nome as categoria_nome, 
                    usuario.id_usuario as id_usuario_auxiliado, ajuda.id_usuario_contribuinte, subcategorias.id_subcategorias, categorias.id_categorias
                    FROM community.ajuda LEFT OUTER JOIN community.categorias on categorias.id_categorias = ajuda.id_categoria
                    LEFT OUTER JOIN community.subcategorias on subcategorias.id_subcategorias = ajuda.id_subcategoria
                    LEFT OUTER JOIN community.usuario on usuario.id_usuario = ajuda.id_usuario_auxiliado
                    WHERE ajuda.id_ajuda = $1;`
    const values1 = [id_ajuda]
    
    try {

        const resAjuda = await ajudasConnection.client.query(sql1, values1)

        const sql2 = `SELECT 
                        pessoa.nome as nome_pessoa_auxiliada, 
                        pessoa.email as email_pessoa_auxiliada, 
                        pessoa.id_pessoa as id_pessoa_auxiliada FROM 
                        community.usuario
                        LEFT OUTER JOIN community.pessoa on pessoa.id_pessoa = usuario.id_pessoa
                        LEFT OUTER JOIN community.ajuda on ajuda.id_usuario_auxiliado = usuario.id_usuario
                        WHERE usuario.id_usuario = $1;`
        const [ajuda] = resAjuda.rows
        const values2 = [ajuda.id_usuario_auxiliado]

        try{
            const resUsuario = await ajudasConnection.client.query(sql2, values2)
            try{

                const sql3 = `SELECT 
                                pessoa.nome as nome_pessoa_contribuinte, 
                                pessoa.email as email_pessoa_contribuinte, 
                                pessoa.id_pessoa as id_pessoa_contribuinte FROM
                                community.usuario
                                LEFT OUTER JOIN community.pessoa on pessoa.id_pessoa = usuario.id_pessoa
                                LEFT OUTER JOIN community.ajuda on ajuda.id_usuario_contribuinte = usuario.id_usuario
                                WHERE usuario.id_usuario = $1;`
                const values3 = [ajuda.id_usuario_contribuinte]

                const resUsuarioContrib = await ajudasConnection.client.query(sql3, values3)

                const retorno = {
                    ajuda: ajuda,
                    usuario_auxiliado: resUsuario.rows,
                    usuario_contribuinte: resUsuarioContrib.rows
                }

                return (retorno);
            } catch(err){
                return(err)
            }

        }catch (err){
            return(err)
        }

    }catch (err) {
        return(err);
    }
}

async function listAllAjudas(status: any){

    const sql1 = `SELECT ajuda.id_ajuda, ajuda.comentario, ajuda.classificacao, ajuda.status, subcategorias.nome as subcategoria_nome, categorias.nome as categoria_nome, 
                    usuario.id_usuario as id_usuario_auxiliado, ajuda.id_usuario_contribuinte
                    FROM community.ajuda LEFT OUTER JOIN community.categorias on categorias.id_categorias = ajuda.id_categoria
                    LEFT OUTER JOIN community.subcategorias on subcategorias.id_subcategorias = ajuda.id_subcategoria
                    LEFT OUTER JOIN community.usuario on usuario.id_usuario = ajuda.id_usuario_auxiliado
                    WHERE ajuda.status = $1;`
    const values1 = [status]
    
    try {

        const resAjuda = await ajudasConnection.client.query(sql1, values1)
        const ajudas = resAjuda.rows

        const retorno = {
            ajudas: ajudas
        }

        return(retorno)

    }catch (err) {
        return(err);
    }
        
}

async function insertAjuda(id_usuario_auxiliado: any, id_categoria: any, id_subcategoria: any, comentario: any){

    const sql = `INSERT INTO community.ajuda
                    (id_usuario_auxiliado, id_categoria, id_subcategoria, comentario, status)
                    VALUES ($1, $2, $3, $4, $5) RETURNING id_ajuda`
    const values = [id_usuario_auxiliado, id_categoria, id_subcategoria, comentario, 1]

    try {

        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

async function listAllAjudaPerHelped(id_usuario_auxiliado: any){

    const sql = `SELECT ajuda.id_ajuda, ajuda.comentario, ajuda.status, subcategorias.nome as subcategoria_nome, categorias.nome as categoria_nome, 
                    ajuda.id_usuario_auxiliado as id_usuario_auxiliado
                    FROM community.ajuda LEFT OUTER JOIN community.categorias on categorias.id_categorias = ajuda.id_categoria
                    LEFT OUTER JOIN community.subcategorias on subcategorias.id_subcategorias = ajuda.id_subcategoria
                    LEFT OUTER JOIN community.usuario on usuario.id_usuario = ajuda.id_usuario_auxiliado
                    WHERE ajuda.id_usuario_auxiliado = $1 AND ajuda.status = 1 or ajuda.status = 2;`
    const values = [id_usuario_auxiliado]

    try {

        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

async function listAllAjudaPerHelper(id_usuario_contribuinte: any){

    const sql = `SELECT ajuda.id_ajuda, ajuda.comentario, ajuda.status, subcategorias.nome as subcategoria_nome, categorias.nome as categoria_nome, 
                    ajuda.id_usuario_contribuinte as id_usuario_contribuinte
                    FROM community.ajuda LEFT OUTER JOIN community.categorias on categorias.id_categorias = ajuda.id_categoria
                    LEFT OUTER JOIN community.subcategorias on subcategorias.id_subcategorias = ajuda.id_subcategoria
                    LEFT OUTER JOIN community.usuario on usuario.id_usuario = ajuda.id_usuario_auxiliado
                    WHERE ajuda.id_usuario_contribuinte = $1 AND ajuda.status = 2;`
    const values = [id_usuario_contribuinte]

    try {

        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }

}

async function changeContribuinte(id_ajuda: any, id_usuario_contribuinte: any){

    const sql = `UPDATE community.ajuda SET id_usuario_contribuinte = $1, status = 2 
                    WHERE id_ajuda = $2 
                    RETURNING id_ajuda, id_usuario_contribuinte;`
    const values = [id_usuario_contribuinte, id_ajuda]

    try {

        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

async function deleteAjuda(id_ajuda: any){

    const sql = `DELETE FROM community.ajuda WHERE ajuda.id_ajuda = $1`
    const values = [id_ajuda]

    try {
        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

async function updateAjuda(id_categoria: any, id_subcategoria: any, comentario: any, status: any, id_ajuda: any){

    const sql = `UPDATE community.ajuda 
                    SET id_categoria = $1, id_subcategoria = $2, comentario = $3, status = $4 
                    WHERE id_ajuda = $5 RETURNING ajuda.id_ajuda, ajuda.comentario, ajuda.status;`
    const values = [id_categoria, id_subcategoria, comentario, status, id_ajuda]

    try {

        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

async function finishHelping(id_ajuda: any, status: any, classificacao: any){

    const sql = `UPDATE community.ajuda
                    SET status = $1, classificacao = $2
                    WHERE id_ajuda = $3 RETURNING ajuda.id_ajuda, ajuda.status, ajuda.classificacao, ajuda.status;`
    const values = [status, classificacao, id_ajuda]

    try {

        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

async function listAllAvailable(id_usuario_auxiliado: any){

    const sql = `SELECT ajuda.id_ajuda, ajuda.comentario, ajuda.status, ajuda.id_usuario_auxiliado, 
    pessoa.nome as nome_pessoa, pessoa.endereco, pessoa.telefone, pessoa.email, 
    categorias.nome as nome_categoria, subcategorias.nome as nome_subcategoria
    FROM community.ajuda 
    LEFT OUTER JOIN community.usuario on usuario.id_usuario = ajuda.id_usuario_auxiliado
    LEFT OUTER JOIN community.pessoa on pessoa.id_pessoa = usuario.id_pessoa
    LEFT OUTER JOIN community.categorias on categorias.id_categorias = ajuda.id_categoria
    LEFT OUTER JOIN community.subcategorias on subcategorias.id_subcategorias = ajuda.id_subcategoria
    WHERE ajuda.id_usuario_auxiliado != $1 and ajuda.status = 1`

    const values = [id_usuario_auxiliado]

    try {

        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

async function listAllongoingPerHelper(id_usuario_contribuinte: any){

    const sql = `SELECT ajuda.id_ajuda, ajuda.comentario, ajuda.status, ajuda.id_usuario_contribuinte, 
    pessoa.nome as nome_pessoa, pessoa.endereco, pessoa.telefone, pessoa.email, 
    categorias.nome as nome_categoria, subcategorias.nome as nome_subcategoria
    FROM community.ajuda 
    LEFT OUTER JOIN community.usuario on usuario.id_usuario = ajuda.id_usuario_contribuinte
    LEFT OUTER JOIN community.pessoa on pessoa.id_pessoa = usuario.id_pessoa
    LEFT OUTER JOIN community.categorias on categorias.id_categorias = ajuda.id_categoria
    LEFT OUTER JOIN community.subcategorias on subcategorias.id_subcategorias = ajuda.id_subcategoria
    WHERE ajuda.id_usuario_contribuinte = $1 and ajuda.status = 2`

    const values = [id_usuario_contribuinte]

    try {

        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }

}

async function listAllFinishedPerHelped(id_usuario_auxiliado: any){

    const sql = `SELECT ajuda.id_ajuda, ajuda.status, ajuda.id_usuario_auxiliado, 
    pessoa.nome as nome_pessoa, pessoa.endereco, pessoa.telefone, pessoa.email, 
    categorias.nome as nome_categoria, subcategorias.nome as nome_subcategoria
    FROM community.ajuda 
    LEFT OUTER JOIN community.usuario on usuario.id_usuario = ajuda.id_usuario_auxiliado
    LEFT OUTER JOIN community.pessoa on pessoa.id_pessoa = usuario.id_pessoa
    LEFT OUTER JOIN community.categorias on categorias.id_categorias = ajuda.id_categoria
    LEFT OUTER JOIN community.subcategorias on subcategorias.id_subcategorias = ajuda.id_subcategoria
    WHERE ajuda.id_usuario_auxiliado = $1 and ajuda.status = 3`

    const values = [id_usuario_auxiliado]

    try {

        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

async function listAllFinishedPerHelper(id_usuario_contribuinte: any){

    const sql = `SELECT ajuda.id_ajuda, ajuda.status, ajuda.id_usuario_contribuinte, 
    pessoa.nome as nome_pessoa, pessoa.endereco, pessoa.telefone, pessoa.email, 
    categorias.nome as nome_categoria, subcategorias.nome as nome_subcategoria
    FROM community.ajuda 
    LEFT OUTER JOIN community.usuario on usuario.id_usuario = ajuda.id_usuario_contribuinte
    LEFT OUTER JOIN community.pessoa on pessoa.id_pessoa = usuario.id_pessoa
    LEFT OUTER JOIN community.categorias on categorias.id_categorias = ajuda.id_categoria
    LEFT OUTER JOIN community.subcategorias on subcategorias.id_subcategorias = ajuda.id_subcategoria
    WHERE ajuda.id_usuario_contribuinte = $1 and ajuda.status = 3`

    const values = [id_usuario_contribuinte]

    try {

        const res = await ajudasConnection.client.query(sql, values);
        return res.rows;

    } catch (err) {
        return(err);
    }
}

module.exports = { 
    insertAjuda, 
    listOneAjuda, 
    listAllAjudaPerHelped, 
    listAllAjudaPerHelper, 
    updateAjuda, 
    deleteAjuda, 
    changeContribuinte, 
    finishHelping, 
    listAllAvailable, 
    listAllFinishedPerHelped,
    listAllFinishedPerHelper,
    listAllongoingPerHelper,
    listAllAjudas
}