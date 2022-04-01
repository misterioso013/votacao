import exec from '../../src/lib/database';

export default async function create(req, res) {

    try {
        const body = req.body;
        const user_id = body.user_id;
        const poll_id = body.poll_id;
        

        const answers = Object.keys(body).filter(key => key.startsWith('answer_'));
        const values = answers.map(answer => body[answer]);
       for (let i = 0; i < values.length; i++) {
            const query = `INSERT INTO answers (title, poll_id, votes ) VALUES (?, ?, ?)`;
            const values_query = [values[i], poll_id, 0];
            await exec({ query: query, values: values_query });
        }

        res.redirect(`/poll/${poll_id}`);
    }catch (e) {
        res.send(e.message);
    }
}


