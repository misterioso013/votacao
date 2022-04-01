import { parseCookies } from "nookies";
import axios from "axios";
import styles from "../styles/my.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function My({data, user_id}) {

    const handleDelete = (id) => {
        axios.delete(`/api/poll/delete?id=${id}&user_id=${user_id}`)
            .then(res => {
                alert("Poll deleted!");
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }
    if(data.length == 0){
        return(
            <div>
                <h1 className={styles.title}>Suas enquetes</h1>
                <p className={styles.empty}>Você não possui nenhuma enquete.</p>
            </div>
        );
    }
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Suas enquetes</h1>
            <ul className={styles.ul}>
                {data.map((poll) => {
                    return(
                        <li key={poll.id} className={styles.li}>
                            <a href={`/poll/${poll.id}`}>{poll.title}</a> - <button
                            className={styles.button}
                            onClick={() => handleDelete(poll.id)}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </li>
                    );
                }) }
            </ul>
        </div>
    );
}


export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const user_id = cookies.user_id? cookies.user_id : Math.floor(Math.random() * 1000000);
    const res = await fetch(`${process.env.API_URL}/my?user_id=${user_id}`);
    const data = await res.json();

    return {
        props: {
            data: data,
            user_id: user_id
        }
    };
}