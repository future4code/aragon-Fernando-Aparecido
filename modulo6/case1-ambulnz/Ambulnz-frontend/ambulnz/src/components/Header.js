import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../routes/coordinator";

// Função que renderiza condicionalmente o header de cada página.
function Header(props) {
    // variável navigate -> Armazena a chamada do Hook useNavigate do react-router-dom
    const navigate = useNavigate();

    // Função que promove o efeito de logout do sistema
    const logout = () => {
        // Estrutura condicional de confirmação do logout.
        if (window.confirm("Tem certeza de que deseja sair?")) {
            /* Início de comentário multi-linha

                Ao ser confirmado, removemos 'token' e 'userEmail' do localStorage, permitindo
                a exibição de páginas desprotegidas e bloqueando as páginas protegidas.
            
            Fim de comentário multi-linha */
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            goToLoginPage(navigate);
            alert("Logout com sucesso!");
        };
    };

    return (
        <header>
            <h1>LabEddit</h1>
            {/* Início de comentário multi-linha
            
                Renderização condicional de Header, através da props booleana 'isProtected'.
                Caso Header seja exibida em uma página protegida, 'isProtected' assume o
                valor true e exibe o email do usuário logado e um botão de logout.
                Caso Header seja exibida em uma página desprotegida, exibirá apenas o 
                nome do site.
            
            Fim de comentário multi-linha */}
            {props.isProtected && (
                <>
                    <h3>Bem-vindo, {localStorage.getItem("userEmail")}!</h3>
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </header>
    );
};

export default Header;