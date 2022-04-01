import exec from "../../src/lib/database";

export default async function handle(req, res) {
    try {

        const title = req.query.title;
        const date_start = req.query.date_start ? new Date(req.query.date_start) : new Date();
        const date_end = req.query.date_end ? new Date(req.query.date_end) : new Date(date_start.getTime() + (1000 * 60 * 60 * 24 * 7));
        const description = req.query.description;
        const user_id = req.query.user_id;
        const user_name = req.query.user_name;

        const query = `INSERT INTO polls (title, date_start, date_end, description, user_id, user_name) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [title, date_start, date_end, description, user_id, user_name];

        const result = await exec({ query, values });

        res.status(200).json({
            status: "success",
            data: result
        });

    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}