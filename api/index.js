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

app.post('/clientes', (req, res) => {
  const { nome, email } = req.body;
  const sql = 'INSERT INTO clientes (nome, email) VALUES (?, ?)';
  connection.query(sql, [nome, email], (err, results) => {
    if (err) {
      console.error('Erro ao adicionar cliente:', err);
      res.status(500).json({ erro: 'Erro ao adicionar cliente' });
    } else {
      res.status(201).json({ id: results.insertId, nome, email });
    }
  });
});

app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  const sql = 'UPDATE clientes SET nome = ?, email = ? WHERE id = ?';
  connection.query(sql, [nome, email, id], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar cliente:', err);
      res.status(500).json({ erro: 'Erro ao atualizar cliente' });
    } else {
      res.json({ mensagem: 'Cliente atualizado com sucesso' });
    }
  });
});

app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM clientes WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar cliente:', err);
      res.status(500).json({ erro: 'Erro ao deletar cliente' });
    } else {
      res.json({ mensagem: 'Cliente deletado com sucesso' });
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
