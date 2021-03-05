require('dotenv').config();
const async_hooks = require('async_hooks');

const pino = require('pino')('./logs/info.log');
const expressPino = require('express-pino-logger')({
  logger: pino
});

import { v4 as uuidv4 } from 'uuid';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const executionContexts = {}; // for async hooks logging

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true // default logger
  });

  app.use(expressPino);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription(
      'Open API that provides all range of CRUD operations with User model'
    )
    .setVersion('0.0.1')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // start async hooks for logging
  async_hooks.createHook({ init, after, destroy }).enable();

  await app.listen(3000);
}

bootstrap();

// async hooks functions for logging
export { executionContexts };

function init(asyncId: string, type: string, triggerAsyncId: string): void {
  if (executionContexts[triggerAsyncId]) {
    executionContexts[asyncId] = executionContexts[triggerAsyncId];
  } else {
    executionContexts[asyncId] = { id: uuidv4() };
  }
}

// cleaning to prevent memory leaks
function destroy(asyncId: string): void { delete executionContexts[asyncId]; }
function after(asyncId: string): void { delete executionContexts[asyncId]; }
