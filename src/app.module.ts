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
    MongooseModule.forRoot('mongodb://localhost:27017/escot-blog'),
    ArticlesModule,
    AuthModule,
  ],
  controllers: [AppController, ArticlesController],
  providers: [AppService],
})
export class AppModule {}
