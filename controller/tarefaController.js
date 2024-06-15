const tarefaModel = require("../models/tarefaModel.js");

class tarefaController{
   apiReadList(req, res) {
    const retorno = tarefaModel.apiReadList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhuma tarefa foi encontrada!")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  apiRead(req, res) {
    const { id } = req.params;
    const retorno = tarefaModel.apiRead(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Tarefa não encontrada!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  apiCreate(req, res) {
    const reqBody = req.body; 
    const retorno = tarefaModel.apiCreate(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Tarefa criada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  apiUpdate(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
      
    const retorno = tarefaModel.apiUpdate(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Tarefa atualizada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));

  }

  apiDelete(req, res) {
    const { id } = req.params;
    const retorno = tarefaModel.apiDelete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Tarefa deletada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  
  // ----------------------------------------------------------------------------------------------
  // Integração Front End x Back End
  // ----------------------------------------------------------------------------------------------

  viewCreate(req, res) {
    return res.status(200).render("./tarefa/tarefa_create", { title: "Adicionar uma nova tarefa!" });
  }
  
  viewReadList(req, res) {
    const tarefaList = tarefaModel.readList();
    return tarefaList
      .then((result) =>
        result.length == 0
          ? res.status(404).render("./tarefa/tarefa_read", { title: "Listar Tarefa", tarefa: result, search: '' })
          : res.status(200).render("./tarefa/tarefa_read", { title: "Listar Tarefa", tarefa: result , search: '' })
      )
      .catch((error) => res.status(400).send(error.message));  
  }

  viewUpdate(req, res) {
    const { id } = req.params;
    const tarefa = tarefaModel.read(id);
    return tarefa
      .then((result) =>
        result.length == 0
          ? res.status(404).redirect("/")
          : res.status(200).render("./tarefa/tarefa_update", { title: "Atualizar cadastro de tarefa", tarefas: result })
      )
      .catch((error) => res.status(400).send(error.message));  
  }

  viewHomePage(req, res) {
    return res.status(200).render("./index", { title: "Página Inicial"});
  }

  create(req, res) {
    const newtarefa = req.body;
    const tarefa = tarefaModel.create(newtarefa);
    return tarefa
      .then((result) => {
        res.status(201).render('modal', {
            color: 'text-success',
            background: 'alert-success',
            icone: 'fa-check',
            modalTitle: 'Cadastro Inserido',
            message: `Pessoa cadastrada com sucesso!`,
            redirectUrl: '/tarefa'
        });
    })
      .catch((error) => res.status(400).send(error.message));    
  }
  update(req, res) {
    const { id } = req.params;
    const updatedtarefa = req.body;
    const tarefa = tarefaModel.update(updatedtarefa, id);
    return tarefa
      .then((result) => {
          res.render('modal', {
              color: 'text-primary',
              background: 'alert-primary',
              icone: 'fa-pen',
              modalTitle: 'Cadastro Atualizado',
              message: `Tarefa ${id} atualizada com sucesso!`,
              redirectUrl: '../../tarefa'
          });
      })
      .catch((error) => res.status(400).send(error.message));
}
  delete(req, res) {
    const { id } = req.params;
    const tarefa = tarefaModel.delete(id);
    return tarefa
      // .then((result) => res.status(200).send("<script> alert('Pessoa excluída com sucesso!'); window.location='../../pessoa' </script>"))
      .then((result) => {
        res.status(200).render('modal', {
            color: 'text-danger',
            background: 'alert-danger',
            icone: 'fa-trash',
            modalTitle: 'Cadastro Excluido',
            message: `Pessoa ${id} excluída com sucesso!`,
            redirectUrl: '/tarefa'
        });
    })
      .catch((error) => res.status(400).send(error.message));  
  }

    search(req, res) {
      const pesquisa  = '%' + req.body.search + '%';
      const tarefasList = tarefaModel.search(pesquisa);
      return tarefasList
        .then((result) =>
          result.length == 0
            ? res.status(404).render("./tarefa/tarefa_read", { title: "Tarefa", tarefas: result, search: req.body.search })
            : res.status(200).render("./tarefa/tarefa_read", { title: "Tarefa", tarefas: result, search: req.body.search })
        )
        .catch((error) => res.status(400).send(error.message));  
    }

}

module.exports = new tarefaController();