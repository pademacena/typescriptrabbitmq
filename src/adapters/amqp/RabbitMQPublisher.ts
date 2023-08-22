import * as amqp from 'amqplib';

class RabbitMQPublisher {
  private readonly queueName: string;
  private channel!: amqp.Channel;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  async publishMessage(message: string): Promise<void> {
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672/');
    this.channel = await connection.createChannel();
    
    await this.channel.assertQueue(this.queueName, { durable: true });
    this.channel.sendToQueue(this.queueName, Buffer.from(message), { persistent: true });
    
    await this.channel.close();
    await connection.close();
  }
}

export default RabbitMQPublisher;
