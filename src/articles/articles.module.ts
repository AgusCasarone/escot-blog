/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema, Article } from './schemas/article.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService],
    exports: [ArticlesService]
})
export class ArticlesModule {}
