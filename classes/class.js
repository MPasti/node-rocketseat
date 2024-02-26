class ListaDeTarefas {
  constructor() {
    this.tarefas = [];
  }

  adicionarTarefa(tarefa) {
    this.tarefas.push(tarefa);
  }

  removerTarefa(tarefa) {
    const index = this.tarefas.indexOf(tarefa);
    if (index > -1) {
      this.tarefas.splice(index, 1);
    }
  }

  buscarTarefa(tarefa) {
    return this.tarefas.includes(tarefa);
  }

  listarTarefas() {
    console.log(this.tarefas);
  }
}

class Pilha extends ListaDeTarefas {
  empilharTarefa(tarefa) {
    this.adicionarTarefa(tarefa);
  }

  desempilharTarefa() {
    return this.tarefas.pop();
  }
}

class Fila extends ListaDeTarefas {
  enfileirarTarefa(tarefa) {
    this.adicionarTarefa(tarefa);
  }

  desenfileirarTarefa() {
    return this.tarefas.shift();
  }
}

const lista = new ListaDeTarefas();
lista.adicionarTarefa("Fazer compras no supermercado");
lista.adicionarTarefa("Estudar para a prova de matemática");
lista.adicionarTarefa("Ir à academia");
lista.adicionarTarefa("Passear com o cachorro");
lista.listarTarefas();
// ["Fazer compras no supermercado", "Estudar para a prova de matemática", "Ir à academia", "Passear com o cachorro"]

lista.removerTarefa("Ir à academia");

console.log(lista.buscarTarefa("Ir ao cinema")); // false

lista.listarTarefas();
// ["Fazer compras no supermercado", "Estudar para a prova de matemática", "Passear com o cachorro"]

const pilha = new Pilha();
pilha.empilharTarefa("Tarefa 1");
pilha.empilharTarefa("Tarefa 2");
pilha.empilharTarefa("Tarefa 3");
console.log(pilha.desempilharTarefa()); // "Tarefa 3"
console.log(pilha.desempilharTarefa()); // "Tarefa 2"

const fila = new Fila();
fila.enfileirarTarefa("Tarefa A");
fila.enfileirarTarefa("Tarefa B");
fila.enfileirarTarefa("Tarefa C");
console.log(fila.desenfileirarTarefa()); // "Tarefa A"
console.log(fila.desenfileirarTarefa()); // "Tarefa B"
