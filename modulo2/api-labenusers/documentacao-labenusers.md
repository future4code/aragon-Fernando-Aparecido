# LABENUSERS
Esta API serve para exemplificar um generanciamento de usuários.

## INSTRUÇÕES GERAIS

### AUTENTICAÇÃO
Toda requisição deve ter uma identificação de quem está fazendo a requisição. Ela deve ser enviada por meio do header Authorization, da seguinte forma:

```
Authorization: nome-sobrenome-turma
```

Por exemplo, se meu nome é Bob Marley e eu sou da turma Newton, o header deve ser:

```
Authorization: Bob-Marley-Newton
```

## REQUISIÇÕES

### REQUISIÇÃO 1

#### Método GET - Nome getAllUsers

Endereço url: https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users

#### DESCRIÇÃO
Esta requisição serve para ver o id e o name de todos os usuários.

#### INPUT (Entrada)

Headers:

```
Authorization: nome-sobrenome-turma
```

#### OUTPUT (Saídas)

Retorna uma lista de usuários com propriedades id e name, onde:

id = id do usuário
name = nome do usuário

Exemplo de resposta:
```
[
    {
        "id": "string",
        "name": "string"
    }
]
```

### REQUISIÇÃO 2

#### Método GET - Nome getUserById

Endereço url: https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/:id

#### DESCRIÇÃO

Esta requisição permite visualizar as informações de um usuário (name e email) pelo seu id.

#### INPUT (Entrada)

Headers:

```
Authorization: nome-sobrenome-turma
```

Params: 

```
id: userId
```

#### OUTPUT (Saídas)

Retorna um usuário em forma de objeto, com propriedades id, name e email, onde:

id = id do usuário
name = nome do usuário
email = email do usuário

Exemplo de resposta:
```
{
    "email": "string",
    "name": "string",
    "id": "string"
} 
```

### REQUISIÇÃO 3

#### Método GET - Nome searchUsers

Endereço url: https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/search?name=&email=

#### DESCRIÇÃO

Esta requisição serve para criar um novo drink.

#### INPUT (Entrada)

Headers:

```
Authorization: nome-sobrenome-turma
```

Queries String:

```
name: nome exato do usuário (opcional)
```
Observação: não importam se as letras digitadas em name são maiusculas ou minusculas.

```
email: email exato do usuário (opcional)
```
Observação: email é sensitiveCase (importa maiúsculas e minúsculas).

#### OUTPUT (Saídas)

Retorna uma lista de usuários com propriedades id e name, onde:

id = id do usuário
name = nome do usuário

Exemplo de resposta:
```
[
    {
        "id": "string",
        "name": "string"
    }
]
```

### REQUISIÇÃO 4

#### Método POST - Nome createUser

Endereço url: https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users

#### DESCRIÇÃO

Essa requisição cria um novo usuário.

#### INPUT (Entrada)

Headers:

```
Authorization: nome-sobrenome-turma
```

Body: Objeto que representa um usuário, com propriedades name e email, onde:

name= nome do usuário
email = email do usuário

Exemplo de envio:
```
{
    "name": "string",
    "email": "string"
}
```
Observação: O id do usuário é criado pela própria API.

#### OUTPUT (Saídas)

Não há retorno da requisição.

### REQUISIÇÃO 5

#### Método PUT - Nome editUser

Endereço url: https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/:id

#### DESCRIÇÃO

Essa requisição edita um usuário existente.

#### INPUT (Entrada)

Headers:

```
Authorization: nome-sobrenome-turma
```

Params:

```
id: userId
```

Body: Objeto que representa um usuário, com propriedades name e email, onde:

name= nome do usuário
email = email do usuário

Exemplo de envio:
```
{
    "name": "string",
    "email": "string"
}
```

#### OUTPUT (Saídas)

Não há retorno da requisição.

### REQUISIÇÃO 6

#### Método DELETE - Nome deleteUser

Endereço url: https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/:id

#### DESCRIÇÃO

Esta requisição serve para deletar algum usuário.

#### INPUT (Entrada)

Headers:

```
Authorization: nome-sobrenome-turma
```

Params: 

```
id: userId
```

#### OUTPUT (Saídas)

Não há retorno da requisição.