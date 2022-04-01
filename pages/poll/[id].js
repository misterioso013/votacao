import { setCookie, parseCookies } from "nookies";
import { useState, useEffect } from "react";
import axios from "axios";
import Script from "next/script";
import styles from "../../styles/Vote.module.css";
import Head from "next/head";

export default function Poll({id,poll, cookies, user_id}) {

    const [answer, setAnswer] = useState(0);
    const [submit , setSubmit] = useState(false);
    const [data, setData] = useState(poll);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`/api/vote?id=${id}&answer_id=${answer}&user_id=${user_id}`)
            .then(res => {
                alert("Obrigado por votar!");
            })
            .catch(err => {
                console.log(err);
            });
        setAnswer(0);
        setSubmit(true);
    }

    // Verificar mudanças nos dados da API
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`/api/poll/${id}?user_id=${user_id}`)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    return(
        <div>
            <Head>
                <title>{data.data.title} - Vota ai</title>
            </Head>
            <h1 className={styles.title}>{data.data.title}</h1>
            <p className={styles.info}>
                Criada por <strong>{data.data.creator_name}</strong> | {new Date(data.data.date_start) > new Date() ? "Votação ainda não inciou" : new Date(data.data.date_end) >= new Date() ? "Votação em andamento" : "Votação encerrada"} | {data.votes > 0 ? `${data.votes} votos` : "Nenhum voto"}
            </p>
            <p className={styles.description}>{data.data.description}</p>
            <div className={styles.container}>
                <form
                className={styles.form}
                onSubmit={handleSubmit}
                >
                {data.data.answers.map((answer) => {
                    return(
                        <div key={answer.id}>
                            <input type="radio" name={`answer_${answer.id}`} id={`answer_${answer.id}`} value={answer.id}
                            onChange={(e) => {
                                setAnswer(answer.id);
                            }}/>
                            <label htmlFor={`answer_${answer.id}`}> {answer.title} - {answer.votes}</label>
                        </div>
                    );
                })}
                <button type="submit"
                disabled={data.user_voted || new Date(data.data.date_start) >= new Date() ? true : new Date(data.data.date_end) < new Date() ? true : false}
                className={styles.button}
                >Votar</button>
                
                </form>
                <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `document.querySelectorAll("input[type=radio]").forEach(function(e) {
                        e.addEventListener("change", function(e) {
                            document.querySelectorAll("input[type=radio]").forEach(function(e) {
                                e.checked = false;
                            })
                            e.target.checked = true;
                            })})`
                            }}/>
            </div>
        </div>
    );
}


export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const id = context.params.id;
    const user_random =  Math.random().toString().slice(2, 10);
    if(!cookies.user_id) {
        setCookie(context, "user_id",user_random, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
        });
    }
    const user_id = cookies.user_id ? cookies.user_id : user_random;

    const res = await fetch(`${process.env.API_URL}/poll/${id}?user_id=${user_id}`);
    const poll = await res.json();
    return {
        props: {
            poll,
            id,
            cookies,
            user_id
        }
    }
}