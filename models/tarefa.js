const mongoose = require('mongoose');

const tarefaModel = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    datacriacao: { type: Date, default: Date.now },
    prazo: { type: Date },
    prioridade: { type: String, required: true },
    status: { type: String, required: true }
});

const Tarefa = mongoose.model("tarefas", tarefaModel);

module.exports = Tarefa;