import http from "node:http";
//const http = require("http");
//na ultima versão do Node também pedem para colocar node: antes de importar os modulos nativos

//comonJS => padrão de importação usando o require
//atualmente usamos ESModules => Import/Export
//Mas o Node não entende o ESModules que é o pedrão
//para isso temos que chamar no Package.json um type: "modules"

//aqui criamos uma rota, um server http, e recebemos a requisição e a resposta
//req recebemos informações de quem está chamando
//res devolvemos uma resposta

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    //early return
    //não podemos retornar um array, pode ser 3 formatos no maximo, string, buffer ou uint8array
    //então trabalhamos como JSON, para transitar os dados
    return res
      .setHeader("Content-Type", "application/json")
      .end("Listagem de usuários", JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    });

    return res.end("Criação de de usuários");
  }

  console.log(method, url);

  return res.end("hello world!");
});

//está ouvindo nesta porta
server.listen(3333);
