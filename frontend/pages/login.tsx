import { useRouter } from "next/router";
import { FormEvent } from "react";
import { useRef } from "react"
import { login } from "../utils";

export default function Login() {
    const query = useRouter().query;
    const { redirect_uri } = query as { redirect_uri?: string };

    const username = useRef('');
    const password = useRef('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const _username = username.current;
        const _password = password.current;

        await login(_username, _password);
        
        window.location.href = redirect_uri || '/';
    }

    return(
        <div>
            login
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" onChange={e => username.current = e.target.value} />
                <input type="password" placeholder="password" onChange={e => password.current = e.target.value} />
                <input type="submit" />
            </form>
        </div>
    )
}