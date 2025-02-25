import { Module, MiddlewareConsumer } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./modules/users/users.module";
import { User } from "./modules/users/user";
import { FavouritesModule } from "./modules/favourites/favourites.module";
import { Favourites } from "./modules/favourites/favourites";
import { AuthenticationMiddleware } from "./middleware/authentication.middleware";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "cf934n4y8vy7so8",
      signOptions: { expiresIn: "30s" },
    }),
    ConfigModule.forRoot({
      envFilePath: "./env/.env",
      isGlobal: true,
      load: [() => ({ databaseUrl: process.env.DATABASE_URL })],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("databaseUrl"),
        models: [User, Favourites],
        dialect: "postgres",
        query: {
          raw: true,
        },
      }),
    }),
    UsersModule,
    FavouritesModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes("*");
  }
}
