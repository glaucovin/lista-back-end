const mongoose = require('mongoose');
const TarefasServices = require('../services/tarefas.service');
const tarefasService = new TarefasServices();

class TarefasController {
  
  getTarefas = async (req, res) => {
    const tarefas  = await tarefasService.findAll();
    if (!tarefas.length) {
      res.status(204).send({message:'Nenhuma tarefa até o momento.'});
      return
   }
   res.status(200).send(tarefas);
};

  getTarefasById = async (req, res) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(403).send('Opa! O Id está inválido!');
      return;
    };

    const tarefa = await tarefasService.findById(id);
    if(!tarefa) {
      res.status(404).send('Vish... Nenhuma tarefa foi encontrada.');
      return
    }

    res.status(200).send(tarefa);
  };

  createTarefa = async (req,res) => {
    const tarefa = req.body;
    if (!tarefa) {
      res.status(404).send({message:'Nenhuma tarefa foi encontrada!'});
      return
   }
    const tarefaSalva = await tarefasService.createTarefa(tarefa)
    .then(() => {
      res.send({ message: 'Tarefa criada!' });
    })
    .catch((err) => res.status(500).send({error: `Opa! Erro no servidor: ${err}`}))
  };

  editTarefa = async (req, res) => {
    const id = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(403).send({message:'Id Inválido!'});
      return;
    }
    
    const tarefa = req.body;
    
    if (!tarefa) {
      res.status(404).send({message:'Nenhuma tarefa foi encontrada.'});
      return
   }
    await tarefasService.editTarefa(id, tarefa)
    .then(() => {
      res.status(200).send({message: 'Tarefa atualizada!'});
    })
    .catch((err) => res.status(500).send({error: `Opa! Erro no servidor: ${err}`}));
  }

  deleteTarefa = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(403).send({message:'Id Inválido!'});
      return;
   }
    await tarefasService.deleteTarefa(id)
    .then(() => res.status(200).send({message: 'Tarefa excluída com sucesso!'}));
  }
}

module.exports = TarefasController;