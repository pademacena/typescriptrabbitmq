import RabbitMQConsumer from '../adapters/amqp/RabbitMQConsumer';

class ConsumeMessageUseCase {
  private rabbitMQConsumer: RabbitMQConsumer;

  constructor(rabbitMQConsumer: RabbitMQConsumer) {
    this.rabbitMQConsumer = rabbitMQConsumer;
  }

  startConsuming(): void {
    this.rabbitMQConsumer.startConsumer((message) => {
      // Adicione a lógica de processamento da mensagem aqui
      console.log(`Received message: ${message}`);
    });
  }
}

export default ConsumeMessageUseCase;
