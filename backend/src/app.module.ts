import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret:
        'd041b58c6f82705c5c7f8b4e6f51f207d70c5119b94361a71b4c00a371d8641f',
      signOptions: { expiresIn: '2h' },
    }),
    ConfigModule.forRoot({
      envFilePath: './env/.env',
      isGlobal: true,
      load: [() => ({ databaseUrl: process.env.DATABASE_URL })],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('databaseUrl'),
        models: [],
        dialect: 'postgres',
      }),
    }),
  ],
})
export class AppModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthenticationMiddleware).forRoutes('*')
  // }
}
