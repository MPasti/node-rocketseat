//process é uma variável global do node
//stdin é tudo que o usuário escreve no terminal, é uma string
//aqui oq você escreve no terminal ele manda de volta
//tudo que estamos recebendo como entrada, estamos encaminhadno para uma saída
//pipe server para encaminhar
process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

//todo readable tem um método chamado Read
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    //assim é uma stream, com o timeout, ele consegue trabalhar aos poucos, trabalhar com os dados retornados
    //aos poucos

    setTimeout(() => {
      if (i > 100) {
        //push serve para oferecer informações para quem estiver consumindo a stream
        this.push(null);
        //null quer dizer que não tem mais informações para enviar
      } else {
        //buffer.from estamos convertendo um valor para buffer
        const buf = buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, enconding, callback) {
    //recebe 3 parametros, chunk é o pedaço que lemos da Stream de leitura, tudo enviado pelo push, o buf enviado é um chunk
    //enconding é como a informação está codificada
    //callback é uma função que a stream de escrita é chamada quando a informação é terminada
    //dentro de uma stream de escrita não retorna nada, ela processa os dados, não transforma
    console.log(Number(chunk.toString()) * 10);

    callback();
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    //primeiro parametro de um callback é o erro
    //e é preciso enviar como buffer e trnasformado em string
    //buffer é a forma do Node de transicionar entre streams, para não enviar streams inteiros
    callback(null, Buffer.from(String(transformed)));
  }
}

//aqui criamos um objeto
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
//stream de leitura só podemos ler dados, a stream de escrita só podemos escrever dados para ela
//a stream de transformação só podemos ler dados e escrever dados para outro lugar, é intermeio de comunicação
//entre duas streams
