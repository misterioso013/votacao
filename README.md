# SISTEMA DE VOTAÇÃO

## Requisitos
- Nodejs >= 16
- NPM >= 8
- MySQL

## Instalação

```bash
git clone https://github.com/misterioso013/votacao

cd votacao
```
### Variáveis de ambiente
- Crie uma Base de dados no seu banco de dados MySQL.
- Abra o arquivo `.env.example` e altere de acordo com o seu banco de dados MySQL.
- Altere `API_URL` para o domínio do seu servidor, ou deixe como está para rodar em localhost.

### Importar tabelas
Abaixo está todo SQL para a criação das tabelas.

Copie e cole no seu gerenciador de banco de dados:
```sql
create table answers
(
    id      int auto_increment
        primary key,
    title   text          not null,
    poll_id int           not null,
    votes   int default 0 null
);

create table polls
(
    id          int auto_increment
        primary key,
    title       text                                  not null,
    description text                                  not null,
    user_id     int                                   not null,
    user_name   varchar(250)                          not null,
    date_start  timestamp default current_timestamp() not null on update current_timestamp(),
    date_end    timestamp                             null on update current_timestamp(),
    createdAt   timestamp default current_timestamp() not null
);

create table votes
(
    id        int auto_increment
        primary key,
    answer_id int                                   not null,
    poll_id   int                                   not null,
    user_id   int                                   not null,
    createdAt timestamp default current_timestamp() not null
);
```
## Rodando o projeto
Com tudo configurado agora é só rodar os comandos abaixos no seu terminal:
```bash
# instale as depedencias
npm install
# Start o servidor local
npm run dev
```
Ou use Yarn
```bash
# instale as depedencias
yarn
# Start o servidor local
yarn dev
```
Abra http://localhost:3000 no seu navegador e veja o resultado.

## Entenda o projeto
O projeto foi desenvolvido em Next.js, uma tecnologia bastante procurada por clientes que desejam ter um website completo, rápido e muitas possibilidades de expandir.

Foi utilizada a estratégia API First, onde torna as possibilidades de desenvolvido maiores, podendo ser um Aplicativo mobile, um website ou qualquer outro software.