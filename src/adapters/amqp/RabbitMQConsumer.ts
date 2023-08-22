import * as amqp from 'amqplib';

class RabbitMQConsumer {
  private readonly queueName: string;
  private channel!: amqp.Channel;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  async startConsumer(callback: (message: string) => void): Promise<void> {
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672/');
    this.channel = await connection.createChannel();
    
    await this.channel.assertQueue(this.queueName, { durable: true });
    this.channel.prefetch(1); // Process one message at a time
    
    this.channel.consume(this.queueName, async (msg) => {
      if (msg) {
        const message = msg.content.toString();
        callback(message);
        this.channel.ack(msg);
      }
    });
  }
}

export default RabbitMQConsumer;
