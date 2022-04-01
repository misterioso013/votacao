import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";

export default function create({cookies}) {

    const [title, setTitle] = useState("");
    const [date_start, setDateStart] = useState("");
    const [date_end, setDateEnd] = useState("");
    const [description, setDescription] = useState("");
    const [user_id, setUserId] = useState("");
    const [user_name, setUserName] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verificar se data_start é menor ou igual data_end
        if (new Date(date_start) >= new Date(date_end)) {
            alert("A data de início deve ser menor que a data de término.");
            return;
        }

        axios.get(`/api/createPoll?title=${title}&date_start=${date_start}&date_end=${date_end}&description=${description}&user_id=${user_id}&user_name=${user_name}`)
            .then(res => {
                router.push(`/create/[id]`, `/create/${res.data.data.insertId}`);
            })
            .catch(err => {
                alert('Erro ao criar enquete, verifique seus dados e tente novamente.');
                console.log(err);
            });
    }
    
    useEffect(() => {
        if(cookies.user_id) {
            setUserId(cookies.user_id);
        }else{
            // numeric ID integer
            const userId = Math.random().toString().slice(2, 10);
            setCookie(null, "user_id", userId, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/"
            });
            setUserId(userId);
        }

        if(localStorage.getItem("user_name")) {
            setCookie(null, "user_name", localStorage.getItem("user_name"), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/"
            });
            setUserName(localStorage.getItem("user_name"));
        }

    }, []);


    useEffect(() => {
        localStorage.setItem("user_name", user_name);
    }, [user_name]);

    return(
        <div>
            <h1>Create Poll</h1>

            <form onSubmit={handleSubmit}>
            
            <div>
                    <label htmlFor="user_name">Seu nome:</label>
                    <input type="text" name="user_name" id="user_name" required
                    onChange={(e) => setUserName(e.target.value)}
                    value={user_name}
                    />
                </div>

                <div>
                    <label htmlFor="title">Título da votação:</label>
                    <input type="text" name="title" id="title" placeholder="ex: Quem ganhará o BBB?" required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    />
                </div>
                <div>
                    <label htmlFor="description">Descrição:</label>
                    <textarea name="description" id="description" cols="30" rows="10" placeholder="ex: Vote em quem você acredita que será o próximo milionário da casa mais vigiada do Brasil..." required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    >
                    </textarea>
                </div>
                <div>
                    <label htmlFor="date_start">Data de início:</label>
                    <input type="datetime-local" name="date_start" id="date_start" required
                    onChange={(e) => setDateStart(e.target.value)}
                    value={date_start}
                    />
                </div>
                <div>
                    <label htmlFor="date_end">Data de término:</label>
                    <input type="datetime-local" name="date_end" id="date_end" required
                    onChange={(e) => setDateEnd(e.target.value)}
                    value={date_end}
                    />
                </div>
                <div>
                    <button type="submit">Continuar</button>
                </div>

            </form>
        </div>
    );
}

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);

    return {
        props: {
            cookies: cookies
        }
    }
}