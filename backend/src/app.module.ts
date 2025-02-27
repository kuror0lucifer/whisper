import { Module, MiddlewareConsumer } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./modules/users/users.module";
import { User } from "./modules/users/user";
import { FavouritesModule } from "./modules/favourites/favourites.module";
import { Favourites } from "./modules/favourites/favourites";
import { AuthenticationMiddleware } from "./middleware/authentication.middleware";

import { multerConfig } from "./config/multer.config";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/public/",
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
    MulterModule.register(multerConfig),
    UsersModule,
    FavouritesModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes("*");
  }
}
