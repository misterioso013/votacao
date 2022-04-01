import Head from 'next/head';
import Script from "next/script";
import nookies from 'nookies';
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/Answer.module.css";


export default function createAnswers({ data, id, user_id, api_url }) {
    
    const router = useRouter();

    useEffect(() => {
        if (data.data.creator_id != user_id) {
            router.push("/");
        }
        if(data.data.answers.length > 0) {
            router.push(`/poll/${id}`);
        }
    }, []);

    return(
        <div>
            <Head>
                <title>{data.data.title} - Vota ai</title>
            </Head>
            <h1 className={styles.title}>Adicione respostas</h1>
            <p className={styles.description}>Você precisa adicionar no minímo 3 respostas</p>
            <form
            action={`${api_url}/cForm`}
            method="POST"
            className={styles.form}
            >
                <input type="hidden" name="poll_id" value={id} />
                <input type="hidden" name="user_id" value={user_id} />
                <div id="answers">
                    <div>
                        <label htmlFor="answer_1">Resposta 1:</label>
                        <input type="text" name="answer_1" id="answer_1" required/>
                        <button type="button" id="add-answer"
                        onClick={() => {
                            const answers = document.getElementById("answers");
                            const newAnswer = document.createElement("div");
                            newAnswer.className = "answer";
                            newAnswer.innerHTML = `<label for="answer_${answers.childElementCount + 1}">Resposta ${answers.childElementCount + 1}:</label>`;
                            newAnswer.innerHTML += `<input type="text" name="answer_${answers.childElementCount + 1}" id="answer_${answers.childElementCount + 1}" required/>`;
                            newAnswer.innerHTML += `<button type="button" id="remove-answer" onClick="removeAnswer(this)">-</button>`;
                            answers.appendChild(newAnswer);
                        }}>
                            +
                        </button>
                    </div>
                </div>
                <button type="submit" className={styles.button}>Criar</button>
            </form>
            <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                function removeAnswer(e) {
                    e.parentElement.remove();
                }
                document.querySelector("form").addEventListener("submit", function(e) {
                    e.preventDefault();
                    const answers = document.getElementById("answers");
                    if(answers.childElementCount < 3) {
                        alert("Você precisa adicionar no minímo 3 respostas");
                        return false;
                    }else{
                        this.submit();
                    }});
                    `}}
            />
                        
        </div>
    );
}

export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
    const id = context.query.id;
    const user_id = cookies.user_id;

    const res = await fetch(`${process.env.API_URL}/poll/${id}?user_id=${user_id}`);
    const data = await res.json();
    return {
        props: {
            data,
            id,
            user_id,
            api_url: process.env.API_URL,
        },
    };
}