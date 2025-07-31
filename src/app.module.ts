// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';

// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { ShiftsModule } from './shifts/shifts.module';
// import { AssignmentsModule } from './assignments/assignments.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: process.env.DB_HOST,
//       port: parseInt(process.env.DB_PORT ?? '3306'),

//       // port: parseInt(process.env.DB_PORT),
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       autoLoadEntities: true,
//       synchronize: true,
//     }),
//     AuthModule,
//     UsersModule,
//     ShiftsModule,
//     AssignmentsModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AssignmentsModule } from './assignments/assignments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // <--- חשוב! הופך את ConfigModule לזמין בכל המודולים בלי צורך בייבוא נוסף
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ShiftsModule,
    AssignmentsModule,
  ],
})
export class AppModule {}