import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesModule } from './articles/articles.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      (() => {
        const uri = process.env.MONGO_DB_CONNECTION_STRING;
        if (!uri) {
          throw new Error(
            'MONGO_DB_CONNECTION_STRING environment variable is not set',
          );
        }
        return uri;
      })(),
    ),
    ArticlesModule,
    AuthModule,
  ],
  controllers: [AppController, ArticlesController],
  providers: [AppService],
})
export class AppModule {}
