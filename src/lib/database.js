import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    }
});

export default async function exec({ query, values}) {
    try {
        const result = await db.query(query, values);
        await db.end();
        return result;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}