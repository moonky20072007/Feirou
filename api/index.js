const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: 'senha',
  database: 'banco'
});

// Conectando ao banco
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err.message);
    process.exit(1); // encerra o app se não conseguir conectar
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Rota GET para listar todos os clientes
app.get('/clientes', (req, res) => {
  const sql = 'SELECT * FROM clientes';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err);
      res.status(500).json({ erro: 'Erro ao buscar clientes' });
    } else {
      res.json(results);
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
