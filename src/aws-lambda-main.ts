import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { Handler } from 'aws-lambda';
import express from 'express';
import { AppModule } from './app.module';

const bootstrap = async (): Promise<Handler> => {
  const expressApp = express();

  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  await nestApp.init();

  return serverlessExpress({
    app: expressApp,
  });
};

const bootstrapPromise = bootstrap();

export const handler: Handler = async (event, context, callback) => {
  const serverlessExpressHandler = await bootstrapPromise;
  return serverlessExpressHandler(event, context, callback);
};
