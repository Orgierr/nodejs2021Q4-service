import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Trello Service')
  .setDescription("Let's try to create a competitor for Trello!")
  .setVersion('3.0')
  .addBearerAuth({ type: 'http', name: 'JWT' })
  .build();
