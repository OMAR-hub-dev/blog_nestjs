import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as mysqlSession from 'express-mysql-session';
import { localData } from './midlewares/localData';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('ejs');

  const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'blog',
  };
  //  pour enregister la sesssion en bdd
  const MySQLStore = mysqlSession(session);
  const store = new MySQLStore(options);
  // somewhere in your initialization file
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: store,
    }),
  );

  app.use(localData);
  await app.listen(3000);
}
bootstrap();
