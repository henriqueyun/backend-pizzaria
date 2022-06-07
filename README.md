# backend-pizzaria

Backend do Projeto Pizzaria feito para integrar-se com os projetos:

[Front-end do Administrador da Pizzaria](https://github.com/henriqueyun/frontend-pizzaria-admin)<br/>
[Front-end do Cliente da Pizzaria](https://github.com/henriqueyun/frontend-pizzaria-cliente)

## Rodando O Projeto

### Docker

Você pode rodar o projeto utilizando Docker Compose, basta executar na pasta raíz do projeto:
```
docker compose up
```
> Para que o container subam sem problemas, assegure que as portas **8010** e **3306** não estejam em uso.

### Host

Em primeiro lugar, para disponibilizar a aplicação no host local diretamente é fundamental atribuir corretamente as variáveis no arquivo [./env](./.env), uma vez que as variáveis estejam inicializadas, basta executar:
```
# .env configurado e database "pizzaria" criado
npm install
npm run dev
```
> É **obrigatório** que para rodar dessa forma haja um servidor MySQL em funcionamento, que seja criado um banco dados conforme o arquivo [create-db.sql](./db/create-db.sql) e que sejam informadas credenciais válidas para conectar-se à ele no arquivo [./env](./.env).

## Desenvolvendo

Localmente ou através do Docker, a aplicação está preparada para rodar em desenvolvimento com [Nodemon](https://www.npmjs.com/package/nodemon), que permite o *hot reloading*, sempre que uma alteração é feita a aplicação é reiniciada.
```
npm run dev
```

### Seeders

Caso deseje um pequeno conjunto de dados de maneira rápida e simples para fazer testes e demonstrar a aplicação, execute utilizando um cliente MySQL o arquivo [seed.sql](./db/seed.sql)

## Testes

O projeto possui ~~poucos~~ testes automatizados com o [Mocha.js](https://mochajs.org/), para executá-los rode na raíz do projeto:
```
npm run test
```
