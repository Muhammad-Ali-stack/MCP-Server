const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let contextDB = {};

// Save context
app.post('/context/save', (req, res) => {
  const { userId, context } = req.body;
  if (!userId || !context) return res.status(400).send("Missing userId or context");
  contextDB[userId] = context;
  res.send({ message: 'Context saved' });
});

// Get context
app.get('/context/:userId', (req, res) => {
  const userId = req.params.userId;
  const context = contextDB[userId];
  if (!context) return res.status(404).send("Context not found");
  res.send({ userId, context });
});

// AgentForce Copilot Prompt
app.get('/agentforce/context/:userId', (req, res) => {
  const userId = req.params.userId;
  const context = contextDB[userId];
  if (!context) return res.status(404).send("No context found");
  const prompt = `Hello ${userId}, based on your recent activity: "${context}", how can I help you today?`;
  res.send({ prompt });
});

app.listen(port, () => {
  console.log(`✅ MCP Server running at http://localhost:${port}`);
});
