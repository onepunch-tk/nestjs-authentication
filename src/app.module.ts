import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'xorudA0805!',
    database: 'user-auth',
    autoLoadEntities: true,
    synchronize: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
