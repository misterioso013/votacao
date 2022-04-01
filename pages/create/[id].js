import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Script from "next/script";
import nookies from 'nookies';

export default function createAnswers({ data, id, user_id }) {
    return(
        <div>
            <h1>Adicione respostas</h1>
            <p>Você precisa adicionar no minímo 3 respostas</p>
            <form
            action={`${process.env.API_URL}/cForm`}
            method="POST"
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
                            newAnswer.innerHTML += `<button type="button" id="remove-answer" onClick="removeAnswer(this)">Remover</button>`;
                            answers.appendChild(newAnswer);
                        }}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
                <button type="submit">Criar</button>
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
            user_id
        },
    };
}