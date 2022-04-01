import styles from '../styles/Home.module.css';
import Link from "next/link";

export default function Home({ polls }) {

    const date = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString() + ' as ' + d.toLocaleTimeString();
    }
    
    return(
        <div>
            <h1 className={styles.title}>Vota Ai</h1>
            <h2 className={styles.subtitle}>Seu mais novo sistema de votação</h2>

            <div className={styles.buttonVote}>
                <Link href="/create">
                <a className={styles.button}>Criar nova votação</a>
                </Link>
            </div>
    <h2 className={styles.subtitle}>Votações</h2>
            <div className={styles.polls}>
                {polls.data.map(poll => (
                    <div className={styles.poll} key={poll.id}>
                        <h3 className={styles.pollTitle}>{poll.title}</h3>
                        <p className={styles.details}>Criado por: {poll.user_name} - Inicio: {date(poll.date_start)}</p>
                        <p className={styles.description}>{poll.description}</p>
                        <Link href="/poll/[id]" as={`/poll/${poll.id}`}>
                            <a className={styles.button}>
                                Ver votação
                            </a>
                        </Link>
                        </div>
                ))}
                </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const response = await fetch(`${process.env.API_URL}/polls`);
    const data = await response.json();

    return {
        props: {
            polls: data
        }}
}