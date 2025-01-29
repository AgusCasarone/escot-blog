/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { Types } from 'mongoose';

@Controller('articles')
export class ArticlesController {
    constructor(private articleService: ArticlesService) {}

    @Get('getAll')
    async getAllArticles(): Promise<Article[]> {
        return this.articleService.findAll();
    }

    @Post('create')
    async createArticle(
        @Body()
        article: CreateArticleDto,
    ): Promise<Article> {
        return this.articleService.create(article);
    }

    @Get(':id')
    async getById(
        @Param('id') 
        id: string
    ): Promise<Article> {
        return await this.articleService.findById(id);
    }
    


}
