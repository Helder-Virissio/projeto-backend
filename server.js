const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Configurações
app.use(cors());
app.use(express.json());

// Link do seu MongoDB
const mongoURI = "mongodb+srv://gabi:1234567890@ativ-mongo-dev.qspekqm.mongodb.net/tarefas?appName=ativ-mongo-dev";

// Conexão
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Conectado"))
  .catch(err => console.log("❌ Erro de conexão:", err));

// Modelo
const Tarefa = mongoose.model('Tarefa', { 
  titulo: { type: String, required: true } 
});

// Rotas (API)
app.get('/tarefas', async (req, res) => {
  const tarefas = await Tarefa.find();
  res.json(tarefas);
});

app.post('/tarefas', async (req, res) => {
  const novaTarefa = await Tarefa.create(req.body);
  res.json(novaTarefa);
});

// IMPORTANTE: O Render usa a porta que ele mesmo define ou a 10000
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
