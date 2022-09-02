export default function SignupPage() {

    const useNavigate = useNavigate();
    const { form, onChange, clear } = useForm({ name: "", email: "", password: "" });
    const signup = (event) => {
        event.preventDefault();

        requestSignUp(form, clear, navigate);
    };

    return (
        <main>

            <Header
                isProtected={false}
            />
            <hr />
            <section>
                <h2>Cadastro de Novo Usuário</h2>
                <form onSubmit={signup}>
                    <label htmlFor={"name"}> Nome: </label>
                    <input
                        id={"name"}
                        name={"name"}
                        value={form.name}
                        onChange={onChange}
                        pattern={"^.{3,}$"}
                        title={"O nome deve ter no mínimo 3 caracteres"}
                        required
                    />
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
                        pattern={"^.{8,30}$"}
                        title={"O nome deve ter no mínimo 8 e no máximo 30 caracteres"}
                        required
                    />
                    <br />
                    <button type={"submit"}>Cadastrar usuário</button>
                </form>
                <button onClick={() => goToLoginPage(navigate)}>Voltar</button>
            </section>
        </main>
    );
};

