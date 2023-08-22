import express from 'express';
import RabbitMQConsumer from './adapters/amqp/RabbitMQConsumer';

const app = express();
const port = 3000;

app.use(express.json());

const rabbitMQConsumer = new RabbitMQConsumer('my_queue');

rabbitMQConsumer.startConsumer((message) => {
  // Lógica de negócios para processar a mensagem
  console.log(`Received message: ${message}`);
});

app.post('/send-message', (req, res) => {
  const { message } = req.body;
  // Lógica para publicar a mensagem no RabbitMQ
  res.send('Message sent to RabbitMQ');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
