import { Request, Response } from 'express';
import RabbitMQPublisher from '../adapters/amqp/RabbitMQPublisher';

class MessageController {
  private rabbitMQPublisher: RabbitMQPublisher;

  constructor(rabbitMQPublisher: RabbitMQPublisher) {
    this.rabbitMQPublisher = rabbitMQPublisher;
  }

  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const { message } = req.body;

      if (!message) {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      await this.rabbitMQPublisher.publishMessage(message);
      res.status(200).json({ message: 'Message sent to RabbitMQ' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default MessageController;
