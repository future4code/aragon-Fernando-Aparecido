import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStateContext from "../global/GlobalStateContext";
import { requestChangePostVote, requestCreatePostVote, requestDeletePostVote } from '../services/requests';
import { goToPostDetailsPage } from '../routes/coordinator';

// Função reponsável por renderizar o card que representa um post.
function PostCard(props) {
    // variável navigate -> Armazena a chamada do Hook useNavigate do react-router-dom
    const navigate = useNavigate();

    // states -> objeto desestruturado do GlobalState e acessado pelo Hook useContext().
    const { setters, getters } = useContext(GlobalStateContext);

    // isDownVoted -> Variável de estado booleana que diz se um voto "Não Gostei" existe (true).
    // setIsDownVoted -> Função de alteração da variável de estado isDownVoted.
    const [isDownVoted, setIsDownVoted] = useState(false);

    // isUpVoted -> Variável de estado booleana que diz se um voto "Gostei" existe (true).
    // setIsUpVoted -> Função de alteração da variável de estado isUpVoted.
    const [isUpVoted, setIsUpVoted] = useState(false);

    // setPost -> Função que atualiza a variável de estado post (informações de post selecionado).
    const { setPost } = setters;

    // getPosts -> Função que busca lista de posts e que está armazenado no objeto getters.
    const { getPosts } = getters;

    // Desestruturação da props que representa um post no PostCard.
    const { id, userId, title, body,
        createdAt, voteSum, commentCount, userVote } = props.post;

    /* Início de comentário multi-linha

       format(parametro1, parametro2) -> Função existente na lib "date-fns" 
       que recebe dois parâmetros e modifica o formato de uma data para o desejado.
       parametro1 -> data no formato original.
       parametro2 -> formato desejado para a data.

       new Date() -> Método nativo JS que configura uma data no formato
       "DIA-DA-SEMANA MÊS DIA-DO-MÊS ANO HORÁRIO POSIÇÃO-GEOGRÁFICA"
       Caso não existam parâmetros, retorna os dados do dia atual.

       stringFormat -> Formato selecionado de exibição da data.
            exemplos:
            dd/MM/yyyy = DIA/MÊS/ANO
            MM/dd/yyyy = MÊS/DIA/ANO

        Observação 1 -> os dois parâmetros devem ser strings.

        Observação 2 -> stringFormat é Sensitive Case, ou seja, sempre utilize
        dd e yyyy ao invés de DD e YYYY para representar DIA e ANO, enquanto que
        para MÊS utilize a forma MM.

    Fim de comentário multi-linha */
    const date = createdAt && format(new Date(createdAt), "dd/MM/yyyy");

    /* Início de comentário multi-linha
    
        Função que renderiza condicionalmente a página em seu momento inicial e também
        quando o usuário insere um voto no post.

        Se existir voto, isUpVoted ou isDownVoted são atualizados, a depender do tipo
        de voto existente (1 significa UpVoted, -1 significa DownVoted)

    Fim de comentário multi-linha */
    useEffect(() => {
        if (userVote) {
            userVote === 1 ? setIsUpVoted(true) : setIsDownVoted(true);
        };
    }, [userVote]);

    // Função que acessa a página de detalhes e comentários de um post (PostDetailsPage).
    const goToComments = () => {
        // Altera a variável de estado post, armazenando as informações do post selecionado.
        setPost(props.post);
        // Função de rota para acesso à página PostDetailsPage.
        goToPostDetailsPage(navigate, id);
    };

    /* Início de comentário multi-linha

        Função que cria e/ou atualiza um voto do usuário num post selecionado.

        'up' -> Representa "Gostei" de um dado post.
        'down' -> Representa "Não Gostei" de um dado post.

        Existem 4 possibilidades de atribuirmos um voto:

        1) Criar um voto 'up' -> É necessário que o parâmetro 'typeVote' seja 'up'
        e que não exista um voto 'DownVote'.
        2) Mudar voto 'down' para 'up' -> É necessário que o parâmetro 'typeVote'
        seja 'up' e que o voto do usuário já exista, isto é, isDownVoted seja true.
        3) Criar um voto 'down' -> É necessário que o parâmetro 'typeVote' seja 'down'
        e que não exista um voto 'UpVote'.
        4) Mudar voto 'up' para 'down' -> É necessário que o parâmetro 'typeVote' seja
        'down' e que o voto do usuário já exista, isto é, isUpVoted seja true.
    
    Fim de comentário multi-linha */
    const chooseVote = (typeVote) => {
        if (typeVote === "up") {
            if (isDownVoted) {
                // Requisição de mudar um voto do usuário para 'up' e atualizar os posts.
                requestChangePostVote(id, 1, getPosts);
                // Atualização dos estados isUpVoted e isDownVoted, que agora devem ser invertidos.
                setIsUpVoted(true);
                setIsDownVoted(false);
            } else {
                // Requisição de criar um voto do usuário como 'up' em um post.
                requestCreatePostVote(id, 1, getPosts);
                // Atualização do estado isUpVoted para true.
                setIsUpVoted(true);
            };
        } else {
            if (isUpVoted) {
                // Requisição de mudar um voto do usuário para 'down' e atualizar os posts.
                requestChangePostVote(id, -1, getPosts);
                // Atualização dos estados isUpVoted e isDownVoted, que agora devem ser invertidos.
                setIsDownVoted(true);
                setIsUpVoted(false);
            } else {
                // Requisição de criar um voto do usuário como 'down' em um post.
                requestCreatePostVote(id, -1, getPosts);
                // Atualização do estado isDownVoted para true.
                setIsDownVoted(true);
            };
        };
    };

    // Função de deleção de um voto do usuário no post, seja este 'up' ou 'down'.
    const removeVote = (typeVote) => {
        // Requisição de remoção do voto do usuário no post.
        requestDeletePostVote(id, getPosts);
        // Verificação condicional de atualização dos estados isUpVoted e isDownVoted
        typeVote === "up" ? setIsUpVoted(false) : setIsDownVoted(false);
    };

    /* Início de comentário multi-linha

        showVoteButtons -> Variável que renderiza condicionalmente os botões de voto
        do usuário. Para votos de posts, este botão verifica se o usuário está em
        FeedPage. Caso não esteja, os botões não serão renderizados.
    
    Fim de comentário multi-linha */
    const showVoteButtons = props.isFeed && (
        <>
            {/* Início de comentário multi-linha

                Renderização condicional de botões de voto 'down'.

                Botão de remover voto existente em 'down' -> Para que este botão 
                seja exibido, é necessário que exista o voto do usuário no registro
                de posts (userVote não é null), enquanto que 'isDownVoted' é 
                utilizado para verificar se o voto existente é 'down' ou 'up'. 
                Caso seja 'down', ocorre uma renderização de botão para 
                criar/atualizar o voto para 'down'.

                Botão de criar/atualizar voto para 'down' -> Este botão será exibido
                caso o usuário não tenha cadastrado um voto no post ou se já existir
                um registro de 'upVote'. É renderizado condicionalmente, exibindo 
                a mudança ou o voto, a depender de isUpVoted.

            Fim de comentário multi-linha */}
            {userVote && isDownVoted ?
                <button onClick={() => removeVote("down")}>Remover voto "Não Gostei"</button>
                : <button onClick={() => chooseVote("down")}>
                    {isUpVoted ? `Mudar voto para "Não Gostei"` : `Votar em "Não Gostei"`}
                </button>
            }
            <br />
            {/* Esta lógica segue processo similar ao descrito acima, mas invertido. */}
            {userVote && isUpVoted ?
                <button onClick={() => removeVote("up")}>Remover voto "Gostei"</button>
                : <button onClick={() => chooseVote("up")}>
                    {isDownVoted ? `Mudar voto para "Gostei"` : `Votar em "Gostei"`}
                </button>
            }
        </>
    );

    return (
        <article>
            <h3>{title}</h3>
            <span><b>Autor: </b>{userId}</span>
            <p>Criado em {date}</p>

            {/* Início de comentário multi-linha
            
                imagem aleatória gerada a partir de gerador de imagens aleatórios (picsum) 
                
                Observação: query 'random' utilizada para gerar imagens distintas para cada
                usuário, passando o id do usuário para a query em questão.

            Fim de comentário multi-linha */}
            <img src={"https://picsum.photos/200/300?random=" + id} alt="Imagem aleatória do post" />
            <p><b>Descrição: </b>{body}</p>

            {/* Início de comentário multi-linha

                voteSum é renderizado condicionado, pois para o caso onde não há votos
                (início ou anulação de todos os votos), esta propriedade assume valor
                'null'. Assim, se esta for 'null', exibimos na tela o valor 0.
            
            Fim de comentário multi-linha */}
            <p>Votos: {voteSum ? voteSum : 0}</p>
            {showVoteButtons}

            {/* Início de comentário multi-linha

                commentCount é renderizado condicionado, pois para o caso onde não
                há votos (início ou anulação de todos os votos), esta propriedade
                assume valor 'null'. Assim, se esta for 'null', exibimos na
                tela o valor 0.
            
            Fim de comentário multi-linha */}
            <p>Comentários: {commentCount ? commentCount : 0}</p>

            {/* Início de comentário multi-linha

                isFeed -> Props que identifica se o card gerado para o post 
                se encontra na página FeedPage ou PostDetailsPage. 
                Se o fluxo se encontra em FeedPage, então é renderizado o botão 
                de "Ver comentários". Caso contrário, ele não aparece.
            
            Fim de comentário multi-linha */}
            {props.isFeed && <button onClick={goToComments}>Ver comentários</button>}
            <hr />
        </article>
    );
};

export default PostCard;