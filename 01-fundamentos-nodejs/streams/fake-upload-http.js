import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

//fetch API serve para fazer requisições de uma aplicação para outra, de um endereço para outro, seja back-end para back
//ou front para back
//só pode ser enviado por POST ou PUT
fetch("http://localhost:3334"),
  {
    method: "POST",
    body: new OneToHundredStream(),
    duplex: "half",
  };
