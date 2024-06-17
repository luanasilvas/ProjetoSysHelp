
class helpDeskDatabase {
  
  initConnection(connection) {
    this.connection = connection; 
    this.initDatabase(); 
  }


  initDatabase() {
    this.connection.connect((error) => {
      if (error) {
        console.log("Ocorreu um erro ao conectar no banco de dados...");
        console.log(error.message); 
        return;
      }
      console.log("Banco de dados conectado com sucesso..."); 
      this.createDatabase(); 
    });
  }

  createDatabase() {
    const sql = "CREATE DATABASE IF NOT EXISTS db_helpDesk";
    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar o banco de dados..."); 
        console.log(error.message); 
        return;
      }
      console.log("Banco de dados criado com sucesso..."); 
      this.connection.query("USE db_helpDesk", (error) => {
        if (error) {
          console.log("Ocorreu um erro ao selecionar o banco de dados..."); 
          return;
        }
        console.log("Banco de dados selecionado com sucesso..."); 
        this.createTableStatus(); 
        this.createTableTarefa(); 
        this.createInsertStatus();
    });
  });
}

  createTableStatus() {
    const sql = `
      CREATE TABLE IF NOT EXISTS status(  
          id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
          descricao VARCHAR(60)
      ) COMMENT 'Tabela Status que faz referencia na tabela tarefa';
      `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela status..."); 
        console.log(error.message); 
        return;
      }
      console.log("Tabela status criada com sucesso..."); 
    });
  }

  createTableTarefa() {
    const sql = `
      CREATE TABLE IF NOT EXISTS tarefas(  
          id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
          descricao VARCHAR(255),
          status_id INT,
          dataCadastro DATETIME COMMENT 'Data de inclusão',
          dataFinalizado DATETIME COMMENT 'Data da Finalização',
          foreign key (status_id) references status(id)
                     ON DELETE CASCADE
                     ON UPDATE CASCADE
      ) COMMENT 'Tabela de tarefas';
      `;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela tarefa..."); 
        console.log(error.message); 
        return;
      }
      console.log("Tabela tarefa criada com sucesso..."); 
    });
  }
  createInsertStatus() {
    // Definindo a consulta para contar o número de registros na tabela
    let contadorQuery = `SELECT COUNT(*) AS count FROM status`;
    
    // Executando a consulta para contar os registros
    this.connection.query(contadorQuery, (error, results) => {
      if (error) {
        console.log("Erro ao verificar os registros na tabela 'status':", error.message);
        return;
      }
  
      // Verificando o resultado da contagem
      let contador = results[0].count;
      if (contador === 0) {
        // Se não houver registros, inserir novos registros
        let sql = `
          INSERT INTO status (descricao) VALUES ('Aberto'),
                                                ('Em Analise'),
                                                ('Encaminhado Desenvolvimento'),
                                                ('Finalizado');
        `;
        
        // Executando a consulta para inserir novos registros
        this.connection.query(sql, (insertError) => {
          if (insertError) {
            console.log("Erro ao criar registros na tabela 'status':", insertError.message);
            return;
          }
          console.log("Registros criados com sucesso na tabela 'status'...");
        });
      } else {
        console.log("A tabela 'status' já contém registros, nenhum novo registro foi inserido.");
      }
    });
  }
  

}

module.exports = new helpDeskDatabase();
