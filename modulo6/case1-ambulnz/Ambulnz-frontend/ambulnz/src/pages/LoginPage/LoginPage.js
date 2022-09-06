import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { goToSignUpPage } from "../../routes/cordinator";
import { requestLogin } from "../../services/requests";

export default function LoginPage() {
    const navigate = useNavigate();
    const { form, onChange, clear } = useForm({ email: "", password: "" });
    const login = (e) => {
        e.preventDefault();
        requestLogin(form, clear, navigate);
    };

    return (

        <main>
            <p>
                <b>Entrar</b>
            </p>
            <form onSubmit={login}>
                <label htmlFor={"email"}> E-mail: </label>
                <input
                    id={"email"}
                    type={"email"}
                    name={"email"}
                    value={form.email}
                    onChange={onChange}
                    required
                />
                <br />
                <label htmlFor={"password"}> Senha: </label>
                <input
                    id={"password"}
                    type={"password"}
                    name={"password"}
                    value={form.password}
                    onChange={onChange}
                    pattern={"^.{4,30}$"}
                    title={"O nome deve ter no mínimo 4 e no máximo 30 caracteres"}
                    required
                />
                <br />
                <button type={"submit"}>Login</button>
            </form>
        </main>
    )
}

