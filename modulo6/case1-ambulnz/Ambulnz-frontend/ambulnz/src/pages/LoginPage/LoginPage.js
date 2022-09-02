
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { goToSignUpPage } from "../../routes/cordinator";

function LoginPage() {
    const navigate = useNavigate();

    const onChangeLogin = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const signIn = (e) => {
        e.preventDefault();
        postLogin(navigate);
    };

    return (

        <main>
            <p>
                <b>Entrar</b>
            </p>
            <form onSubmit={signIn}>
                <required
                    id="email"
                    label="email"
                    name="email"
                    autoComplete="email"
                    placeholder="email@email.com"
                    value={login.email}
                    onChange={onChangeLogin}
                />

                name = "password"
                type="password"
                label="password"
                id="senha"
                placeholder="mínimo 6 caracteres"
                autoComplete="digite seu email"
                value={login.password}
                onChange={onChangeLogin}

                <Button type="submit">
                    <b>Entrar</b>
                </Button>

                onClick={() => goToSignUpPage(navigate)}
                Não possui cadastro? Clique aqui.
            </form>
        </main >
    )
}

export default LoginPage;
