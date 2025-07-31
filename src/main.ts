// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as dotenv from 'dotenv';


// async function bootstrap() {
//   dotenv.config();
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as dotenv from 'dotenv';

// dotenv.config(); // טוען את .env

// console.log('✅ DB_PORT is:', process.env.DB_PORT); // כאן לבדוק שהערך נטען

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

console.log('✅ DB_PORT is:', process.env.DB_PORT);
console.log('🔐 JWT_SECRET is:', process.env.JWT_SECRET);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();