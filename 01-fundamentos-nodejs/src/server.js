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

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  //try catch para caso de errors
  try {
    //com o JSON.parse é possível transformar em um objeto do JS
    req.body = JSON.parse(Buffer.concat(buffers).toString());
    //por aqui da para ver ao enviar um body pelo put no postman
    console.log(reqBody);
  } catch {
    req.body = null;
  }

  if (method === "GET" && url === "/users") {
    //early return
    //não podemos retornar um array, pode ser 3 formatos no maximo, string, buffer ou uint8array
    //então trabalhamos como JSON, para transitar os dados
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = reqBody;
    users.push({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    });

    //Created
    return res.writeHead(201).end();
  }

  console.log(method, url);

  //quando nenhum dos métodos são chamados
  return res.whiteHead(404).end("hello world!");
});

//está ouvindo nesta porta
server.listen(3333);
