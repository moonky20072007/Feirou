
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;


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

// Conectando ao banco (FUNCIONANDO)
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err.message);
    process.exit(1); // encerra o app se não conseguir conectar
  } else {
    console.log('Conectado ao MySQL!');
  }
});

app.get('/', (req, res) => {
  res.send('Servidor Node.js com Express e MySQL está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:$3000`);
});

// Rota GET para listar todos os consumidores (FUNCIONANDO)
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

// Rota POST para inserir dados dos consumidores (FUNCIONANDO)
app.post('/consumidor', (req, res) => {
  const { nome_usuario, email, senha } = req.query;
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

// Rota PUT para alterar os dados dos consumidores (FUNCIONANDO)
app.put('/consumidor/:id', (req, res) => {
  const { id } = req.query;
  const { nome_usuario, email, senha, telefone, quantidade_seguindo } = req.query;
  const sql = 'UPDATE consumidor SET nome_usuario = ?, email = ?, senha = ?, telefone = ?, quantidade_seguindo = ? WHERE id_consumidor = ?';
  connection.query(sql, [nome_usuario, email, senha, telefone, quantidade_seguindo, id], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar cliente:', err);
      res.status(500).json({ erro: 'Erro ao atualizar o consumidor' });
    } else {
      res.json({ mensagem: 'Consumidor atualizado com sucesso' });
    }
  });
});

// Rota POST para inserir dados dos produtores (FUNCIONANDO)
app.post('/produtor', (req, res) => {
  const { id_produtor, nome_usuario, email, senha, CPF_CNPJ, telefone, quantidade_seguindo, quantidade_seguidores, quantidade_posts, descricao_perfil } = req.body;
  console.log('Recebido:', req.body);
  const sql = 'INSERT INTO produtor (id_produtor, nome_usuario, email, senha, CPF_CNPJ, telefone, quantidade_seguindo, quantidade_seguidores, quantidade_posts, descricao_perfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  //connection.query(sql, [id_produtor, nome_usuario, email, senha, CPF_CNPJ, telefone, quantidade_seguindo, quantidade_seguidores, quantidade_posts, descricao_perfil], (err, results) => {
connection.query(sql, [id_produtor, nome_usuario, email, senha, CPF_CNPJ, telefone, quantidade_seguindo, quantidade_seguidores, quantidade_posts, descricao_perfil], (err, results) => {
    if (err) {
      console.error('Erro ao adicionar produtor:', err);
      res.status(500).json({ erro: 'Erro ao adicionar produtor' });
    } else {
      res.status(201).json({ id: results.insertId, nome_usuario, email, senha, CPF_CNPJ, telefone, quantidade_seguindo, quantidade_seguidores, quantidade_posts, descricao_perfil });
    }
  });
});

// Rota PUT para alterar os dados dos produtores (FUNCIONANDO)
app.put('/produtor/:id', (req, res) => {
  const { id } = req.params;
  const { nome_usuario, email, telefone, descricao_perfil } = req.query;
  const sql = 'UPDATE produtor SET nome_usuario = ?, email = ?, telefone = ?, descricao_perfil = ? WHERE id_produtor = ?';
  connection.query(sql, [nome_usuario, email, telefone, descricao_perfil, id], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar produtor:', err);
      res.status(500).json({ erro: 'Erro ao atualizar o produtor' });
    } else {
      res.json({ mensagem: 'Produtor atualizado com sucesso' });
    }
  });
});

// Rota GET para mostrar na tela os dados de um usuario consumidor especifico (FUNCIONANDO)

app.get('/consumidor/:id', (req, res) => {
  const {id} = req.params;
  const sql = 'SELECT id_consumidor, nome_usuario, quantidade_seguindo, telefone from consumidor where id_consumidor = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json(results);
  });
});

// Rota GET para mostrar na tela os dados de um usuario produtor especifico (FUNCIONANDO)
app.get('/produtor/:id', (req, res) => {
  const {id} = req.params;
  const sql = 'SELECT id_produtor, nome_usuario, telefone, descricao_perfil from produtor where id_produtor = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json(results);
  });
});

// Rota GET para listar todos os produtores (FUNCIONANDO)
app.get('/produtor', (req, res) => {
  const sql = 'SELECT * FROM produtor';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar os produtores:', err);
      res.status(500).json({ erro: 'Erro ao buscar os produtores' });
    } else {
      res.json(results);
    }
  });
});

// Rota DELETE para deletar um consumidor (FUNCIONANDO)
app.delete('/consumidor/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM consumidor WHERE id_consumidor = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar consumidor:', err);
      res.status(500).json({ erro: 'Erro ao deletar consumidor' });
    } else {
      res.json({ mensagem: 'Consumidor deletado com sucesso' });
    }
  });
});


// Rota DELETE para deletar um produtor (FUNCIONANDO)
app.delete('/produtor/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM produtor WHERE id_produtor = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar produtor:', err);
      res.status(500).json({ erro: 'Erro ao deletar produtor' });
    } else {
      res.json({ mensagem: 'Produtor deletado com sucesso' });
    }
  });
});


// Rota POST para adicionar um produto
app.post('/produto', (req, res) => {
  const { id_produto, nome_produto, tipo_produto } = req.body;
  const sql = 'INSERT INTO produto (id_produto, nome_produto, tipo_produto) VALUES (?, ?, ?)';
  connection.query(sql, [id_produto, nome_produto, tipo_produto], (err, results) => {
    if (err) {
      console.error('Erro ao adicionar produto:', err);
      res.status(500).json({ erro: 'Erro ao adicionar produto' });
    } else {
      res.status(201).json({ id: results.insertId, id_produto, nome_produto, tipo_produto });
    }
  });
});

// Rota PUT para alterar os dados dos produtos
app.put('/produto/:id', (req, res) => {
  const { id } = req.params;
  const { nome_produto, tipo_produto } = req.body;
  const sql = 'UPDATE produto SET nome_produto = ?, tipo_produto = ? WHERE id_produto = ?';
  connection.query(sql, [nome_produto, tipo_produto, id], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar produto:', err);
      res.status(500).json({ erro: 'Erro ao atualizar o produto' });
    } else {
      res.json({ mensagem: 'Produto atualizado com sucesso' });
    }
  });
});


// Rota GET para listar todos os produtos (FUNCIONANDO)
app.get('/produto', (req, res) => {
  const sql = 'SELECT * FROM produto';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar os produtos:', err);
      res.status(500).json({ erro: 'Erro ao buscar os produtos' });
    } else {
      res.json(results);
    }
  });
});



// Rota GET para mostrar na tela os dados de um produto especifico (FUNCIONANDO)

app.get('/produto/:id', (req, res) => {
  const {id} = req.params;
  const sql = 'SELECT id_produto, nome_produto, tipo_produto from produto WHERE id_produto = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar produto:', err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    res.json(results);
  });
}); 

// Rota DELETE para deletar um produto (FUNCIONANDO)
app.delete('/produto/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM produto WHERE id_produto = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar produto:', err);
      res.status(500).json({ erro: 'Erro ao deletar produto' });
    } else {
      res.json({ mensagem: 'Produto deletado com sucesso' });
    }
  });
});

// Rota para login
app.post('/login', (req, res) => {
  const { email, senha } = req.query;
  
  const sqlConsumidor = 'SELECT * FROM consumidor WHERE email = ? AND senha = ?';
  const sqlProdutor = 'SELECT * FROM produtor WHERE email = ? AND senha = ?';

  connection.query(sqlConsumidor, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao buscar consumidor:', err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
    if (results.length > 0) {
      return res.json({ tipo: 'consumidor', usuario: results[0] });
    } else {
      connection.query(sqlProdutor, [email, senha], (err, results) => {
        if (err) {
          console.error('Erro ao buscar produtor:', err);
          return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
        if (results.length > 0) {
          return res.json({ tipo: 'produtor', usuario: results[0] });
        } else {
          return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
      });
    }
  });
});

// Rota para logout
app.post('/logout', (req, res) => {
  // Aqui você pode adicionar lógica para invalidar tokens ou sessões, se necessário
  res.json({ message: 'Logout realizado com sucesso.' });
}); 



// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});