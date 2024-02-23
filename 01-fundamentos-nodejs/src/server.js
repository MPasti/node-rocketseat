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
const server = http.createServer((req, res) => {
  return res.end("hello world!");
});

//está ouvindo nesta porta
server.listen(3333);
