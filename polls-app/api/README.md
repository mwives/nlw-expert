# Polls App

Polls App is a simple web application for creating, viewing, and voting on polls.

## Instalação

1. Clone o repositório para o seu ambiente local:

```
git clone https://github.com/seu-usuario/polls-app.git
```

2. Instale as dependências do projeto:

```
cd polls-app
npm install
```

## Configuração

Antes de iniciar o servidor, você precisa configurar algumas variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis:

```
PORT=3333
COOKIE_SECRET=sua_chave_secreta_para_cookies
```

Certifique-se de substituir `sua_chave_secreta_para_cookies` por uma chave secreta de sua escolha para cookies de sessão.

## Uso

Para iniciar o servidor, execute o seguinte comando:

```
npm start
```

Isso iniciará o servidor na porta configurada (padrão é 3333). Você pode acessar a aplicação em `http://localhost:3333`.

## Rotas

- **POST /polls**: Cria uma nova enquete.
- **GET /polls/:id**: Retorna os detalhes de uma enquete específica.
- **POST /polls/:id/vote**: Registra um voto em uma enquete existente.

## WebSocket

A aplicação utiliza WebSocket para atualizações em tempo real dos resultados das enquetes. Os clientes podem se conectar ao WebSocket em `ws://localhost:3333/poll-results`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue para relatar bugs, propor novos recursos ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
