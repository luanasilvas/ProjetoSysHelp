const Router = require("express").Router;
const router = Router();
const tarefaController = require("../controller/tarefaController.js");



// ----------------------------------------------------------------------------------------------
// Integração API
// ----------------------------------------------------------------------------------------------


router.get("/api/tarefa",tarefaController.apiReadList);
router.get("/api/tarefa/:id",tarefaController.apiRead);
router.post("/api/tarefa", tarefaController.apiCreate);
router.put("/api/tarefa/:id",tarefaController.apiUpdate);
router.delete("/api/tarefa/:id",tarefaController.apiDelete);

// ----------------------------------------------------------------------------------------------
// Integração Front End x Back End
// ----------------------------------------------------------------------------------------------
router.get("/tarefa/create", tarefaController.viewCreate);
router.get("/tarefa", tarefaController.viewReadList);
router.get("/tarefa/update/:id", tarefaController.viewUpdate);
router.get("/", tarefaController.viewHomePage);
router.post("/tarefa", tarefaController.create);
router.post("/tarefa/:id", tarefaController.update);
router.get("/tarefa/delete/:id", tarefaController.delete);
router.post("/tarefa.search", tarefaController.search);


module.exports = router;