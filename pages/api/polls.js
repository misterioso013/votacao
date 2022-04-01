import exec from '../../src/lib/database';

export default async function handle(req, res) {
    try{

        // listar todas as enquetes
        const query_list_polls = `SELECT * FROM polls ORDER BY id DESC`;
        const values_list_polls = [];
        const result_list_polls = await exec({ query: query_list_polls, values: values_list_polls });

        res.status(200).json({
            status: "success",
            data: result_list_polls
        });

    }catch(err){
        res.json({ error: err });
    }
}