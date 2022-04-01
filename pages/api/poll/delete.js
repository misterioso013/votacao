import exec from '../../../src/lib/database';

export default async function handle(req, res) {
    try {
        const user_id = Number(req.query.user_id);
        const id = req.query.id;

        
        // Excluir enquete
        const query_delete_poll = `DELETE FROM polls WHERE id = ? AND user_id = ?`;
        const values_delete_poll = [id , user_id];
        const result_delete_poll = await exec({ query: query_delete_poll, values: values_delete_poll });

        // Excluir respostas
        const query_delete_answers = `DELETE FROM answers WHERE poll_id = ?`;
        const values_delete_answers = [id];
        const result_delete_answers = await exec({ query: query_delete_answers, values: values_delete_answers });

        // Excluir votos
        const query_delete_votes = `DELETE FROM votes WHERE poll_id = ?`;
        const values_delete_votes = [id];
        const result_delete_votes = await exec({ query: query_delete_votes, values: values_delete_votes });

        res.status(200).json({
            status: "success",
            message: "Poll deleted!"
        });

    }catch(err){
       res.json({ error: err });
    }
}