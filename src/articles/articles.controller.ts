import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  async getAllArticles(@Query() query: ExpressQuery): Promise<Article[]> {
    return this.articleService.findAll(query);
  }

  @Post('create')
  @UseGuards(AuthGuard())
  async createArticle(
    @Body()
    article: CreateArticleDto,
  ): Promise<Article> {
    return this.articleService.create(article);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateArticle(
    @Param('id')
    id: string,
    @Body()
    article: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.updateById(id, article);
  }

  @Get(':id')
  async getById(
    @Param('id')
    id: string,
  ): Promise<Article> {
    return await this.articleService.findById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteById(
    @Param('id')
    id: string,
  ): Promise<Article> {
    return await this.articleService.deleteById(id);
  }
}
