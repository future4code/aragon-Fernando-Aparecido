# Aula - Integrações de API

## Inicie o projeto por aqui

- Passo 1: Crie uma branch a partir da branch master para trabalhar no exercício de hoje. O nome da branch de hoje deve ser: api-labenusers;
- Passo 2: Dentro da pasta do módulo atual, crie uma pasta chamada apis-labenusers para trabalhar no exercício de hoje;
- Passo 3: Não esqueça de colocar o link do surge na descrição do PR!

## Enunciado

Este exercício será desenvolvido ao longo de duas aulas (a atual e a seguinte). O propósito dele é construir um pequeno sistema de cadastro de usuários (frontend). Ele deve ser integrado com uma API já pronta, cuja documentação encontra-se dentro dessa pasta no arquivo documentacao-labenusers

## Implementação

Antes de começarmos a praticar, vamos buscar entender a proposta da atividade. A seguir, temos o link de modelo da atividade, além de uma descrição breve dos elementos e estruturas propostas.

## Modelo de Implementação

Link: 


http://labeuse-ativ.surge.sh/

## Descrição da Implementação

Este projeto consiste de um conjunto em uma única tela com 3 seções: uma seção para cadastro de usuários, uma seção para exibição e remoção de usuários e uma seção para detalhar ou alterar usuários. A seguir detalharemos cada seção.

### Seção1 - Responsável pelo cadastro dos usuários

Esta seção possui um formulário para cadastro do usuário, composto por 2 campos inputs: um para nome e outro para e-mail. Além disto, o formulário conta com um botão de envio dos dados e efetuação do cadastro. Um alert é enviado confirmando se o cadastro foi ou não sucedido.

### Seção2 - Responsável pela exibição e remoção de um usuário específico

Esta seção é responsável por exibir o nome dos usuários cadastrados na forma de lista não ordenada.
Ao clicar no nome de um usuário, os detalhes deste usuário (nome e email) devem ser exibidos na Seção3.
Ao lado de cada nome de usuário existe um botão de remoção do respectivo usuário. Uma confirmação de remoção é enviada ao clicar no botão. Ao fim, um alert é enviado confirmando o sucesso da operação.

### Seção3 -  Responsável por exibir detalhes de usuário e alterar seus respectivos dados

Esta seção alterna entre dois ambientes: um de detalhes de usuários e um para alterar os dados deste usuário.

- Componente de detalhes de usuários: Ao clicar em um nome de usuário na Seção2, os detalhes de um usuário são exibidos na Seção3. Nesta exibição, deve existir um botão para alternar a Seção3 entre detalhes de usuário e alteração de dados.
- Componente de alteração de dados: Na alteração de dados do usuário é exibido um formulário para edição, composto por 2 campos inputs: uma para nome e outro para e-mail. Além disto, o formulário conta com um botão de confirmação das alterações e um botão para voltar a exibição de detalhes do usuário (sem alterá-lo). Uma condição deve ser criada para verificar se os dados fornecidos para alteração do usuário não são vazios. Um alert é enviado confirmando se a alteração foi ou não sucedida.

Observação: Todas as alterações de dados, seja criação de um novo usuário, alteração de dado ou remoção de usuário, devem atualizar a lista de usuários na Seção2.

## Exercícios

Hoje iniciaremos a construção das seções definidas acima, focando apenas na criação de novos usuários e exibição destes e seus detalhes na tela.

PASSO1: Verifique se todas as libs a serem utilizadas foram instaladas.

PASSO2: Crie as seções definidas acima (sugestão: separe em componentes).

PASSO3:  Implemente as seguintes lógicas de integração:

- Seção1: Criação de usuários.

    Dica1: Use o endpoint createUser

    Dica2: Crie propriedades de estado para armazenar os dados fornecidos pelo usuário.

- Seção2: Exibição de lista de usuários  na Seção2 e exibição de detalhes de usuário para a Seção3 (somente).

    Dica1: Use os endpoints getAllUsers e getUserById

    Dica2: Crie uma propriedade de estado para armazenar a lista de usuários.

    Dica3: Use o componentDidMount para exibir a lista assim que a tela carregar.

    Dica4: Use props para transferir dados (como id do usuário).

- Seção3: Exibição de detalhes de usuário selecionado (somente).

    Dica1: Crie uma propriedade de estado para armazenar os detalhes do usuário.

    Dica2: Use props para transferir dados (como detalhes de usuário)


Dicas Gerais:

Dica1: Criar um estado em componente pai a todas as seções (filhos) pode auxiliar na transferência de dados.

Dica2: Funções devem estar no mesmo ambiente que as variáveis de estado utilizadas.

Dica3: Para atualizar a lista de usuários, pense em uma maneira de chamar a função de receber listas sempre que uma alteração ocorrer ou um método que chame esta função a cada atualização do componente.