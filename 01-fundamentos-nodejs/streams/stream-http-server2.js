import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

//tudo no node são streams, todas portas de entrada e saida do node são streams, req e res
//req => readableStream
//res => writableStream
const server = http.createServer(async (req, res) => {
  //criamos um array para ir manipulando os buffers
  const buffers = [];

  //o await para streams, faz com que aguarde cada pedaço da stream ser retornado
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  //esperamos o await para poder dar  console nisso
  const fullStream = Buffer.concat(buffers).toString();
  console.log(fullStream);
  return res.end(fullStream);

  //estamos pegando a requisição, invertendo e enviando para a resposta
  //return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334);
