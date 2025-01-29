/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema, Article } from './schemas/article.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService],
    exports: [ArticlesService]
})
export class ArticlesModule {}
