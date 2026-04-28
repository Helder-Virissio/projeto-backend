const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://gabi:1234567890@ativ-mongo-dev.qspekqm.mongodb.net/tarefas?appName=ativ-mongo-dev";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Conectado"))
  .catch(err => console.log("❌ Erro de conexão:", err));

const Tarefa = mongoose.model('Tarefa', { titulo: String });

app.get('/tarefas', async (req, res) => {
  const t = await Tarefa.find();
  res.json(t);
});

app.post('/tarefas', async (req, res) => {
  const t = await Tarefa.create(req.body);
  res.json(t);
});

// ROTA PARA DELETAR (Coloque logo abaixo da rota de POST)
app.delete('/tarefas/:id', async (req, res) => {
  try {
    await Tarefa.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

// O segredo para o Render é esta linha abaixo:
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ON na porta ${PORT}`);
});
