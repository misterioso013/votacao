import exec from '../../../src/lib/database';

export default async function handle(req, res) {

    try {
        
        const id = req.query.id;
        const user_id = req.query.user_id ? Number(req.query.user_id) : null;

        const query_polls = `SELECT * FROM polls WHERE id = ?`;
        const values_polls = [id];
        const result_polls = await exec({ query: query_polls, values: values_polls });

        const query_answers = `SELECT * FROM answers WHERE poll_id = ?`;
        const values_answers = [id];
        const result_answers = await exec({ query: query_answers, values: values_answers });

        const query_votes = `SELECT * FROM votes WHERE poll_id = ?`;
        const values_votes = [id];
        const result_votes = await exec({ query: query_votes, values: values_votes });

        // Verificar se user_id já votou
        const user_voted = result_votes.filter(vote => vote.user_id === user_id);

        const title = result_polls[0].title;
        const date_start = result_polls[0].date_start;
        const date_end = result_polls[0].date_end;
        const description = result_polls[0].description;
        const creator_id = result_polls[0].user_id;
        const creator_name = result_polls[0].user_name;
        const answers = result_answers;

        res.status(200).json({
            status: "success",
            user_voted: user_voted.length > 0,
            votes: result_votes.length,
            answers: answers.length,
            data: {
                title,
                date_start,
                date_end,
                description,
                creator_id,
                creator_name,
                answers
            },
            votes_data: result_votes
        });
        
    }catch (error) {
        res.send(error.message);
    }
}