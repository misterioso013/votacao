import exec from '../../src/lib/database';

export default async function handle(req, res) {
    
    try{
        const user_id = Number(req.query.user_id);
        const poll_id = Number(req.query.id);
        const answer_id = Number(req.query.answer_id);

        // Verificar se o usuario ja votou
        const query = `SELECT * FROM votes WHERE user_id = ? AND poll_id = ?`;
        const values = [user_id, poll_id];
        const result = await exec({query:query, values:values});
        if(result.length > 0) {
            res.json({
                error: "Você já votou nessa enquete",
            });
            return;
        }

        const query_votes = `INSERT INTO votes (user_id, poll_id, answer_id) VALUES (?, ?, ?)`;
        const values_votes = [user_id, poll_id, answer_id];
        const result_votes = await exec({ query: query_votes, values: values_votes });

        const query_answers = `SELECT votes FROM answers WHERE id = ?`;
        const values_answers = [answer_id];
        const total_votes = await exec({ query: query_answers, values: values_answers });
        // adicionar votos ao total de votos
        const query_total_votes = `UPDATE answers SET votes = ? WHERE id = ?`;
        const values_total_votes = [total_votes[0].votes + 1, answer_id];
        const result_total_votes = await exec({ query: query_total_votes, values: values_total_votes });
        
        res.status(200).json({
            status: "success",
            message: "Vote registered successfully",
        });
    }catch (error) {
        res.send(error.message);
    }

}