const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));




var cors = require('cors');
app.use(express.static("public"));
app.use(cors());

app.use(express.json());

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MaRiAgIuLiA17@',
  database: 'feirou'
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

// Rota GET para listar todos os consumidores
app.get('/consumidor', (req, res) => {
  const sql = 'SELECT * FROM consumidor';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar os consumidores:', err);
      res.status(500).json({ erro: 'Erro ao buscar os consumidores' });
    } else {
      res.json(results);
    }
  });
});

app.post('/consumidor', (req, res) => {
  const { nome_usuario, email, senha } = req.body;
  const sql = 'INSERT INTO consumidor (nome_usuario, email, senha) VALUES (?, ?, ?)';
  connection.query(sql, [nome_usuario, email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao adicionar cliente:', err);
      res.status(500).json({ erro: 'Erro ao adicionar cliente' });
    } else {
      res.status(201).json({ id: results.insertId, nome_usuario, email, senha });
    }
  });
});

// Rota PUT para alterar os dados dos consumidores
app.put('/consumidor/:id', (req, res) => {
  const { id } = req.params;
  const { nome_usuario, email } = req.body;
  const sql = 'UPDATE clientes SET nome = ?, email = ? WHERE id = ?';
  connection.query(sql, [nome_usuario, email, id], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar cliente:', err);
      res.status(500).json({ erro: 'Erro ao atualizar o consumidor' });
    } else {
      res.json({ mensagem: 'Cliente atualizado com sucesso' });
    }
  });
});

// Rota PUT para alterar os dados dos produtores

// Rota GET para mostrar na tela os dados de um usuario consumidor especifico

app.get('/consumidor/:id', (req, res) => {
  const {id} = req.params;
  const sql = 'SELECT id_consumidor, nome_usuario, quantidade_seguindo, telefone';

  connection.query(sql, [nome_usuario, quantidade_seguindo, telefone], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
    
    // Se o usuário não for encontrado
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
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