import exec from '../../src/lib/database';

export default async function handle(req, res) {
    try {
        const user_id = req.query.user_id;

        const query = `SELECT * FROM polls WHERE user_id = ?`;
        const values = [user_id];
        const result = await exec({query: query, values: values});
        res.json(result);
    }catch(e) {
        res.status(500).json({
            error: e.message
        });
    }
}