import { setCookie, parseCookies } from "nookies";
export default function Poll({data}) {
    return(
        <div>
            <h1>{data.data.title}</h1>
        </div>
    )
}

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const id = context.params.id;
    if(!cookies.user_id) {
        setCookie(context, "user_id", Math.random().toString().slice(2, 10), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
        });
    }
    const res = await fetch(`${process.env.API_URL}/poll/${id}?user_id=${cookies.user_id}`);
    const data = await res.json();
    return {
        props: {
            data,
            id,
            cookies,
        }
    }
}