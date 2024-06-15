const express = require('express');
const path = require('path')
const app = express();
const port = 3001;
const database = require("./db/index.js");
database();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
const router = require("./routers/index.js");

router(app, express);
app.listen(
    port,
    function (error) {
    if (error){
        console.log("Ocorreu um erro ao rodar o servidor!");
        return;
    } else {
        console.log("O servidor está rodando com sucesso!");
    }
    }
);
