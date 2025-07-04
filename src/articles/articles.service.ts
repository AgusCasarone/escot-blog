import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: mongoose.Model<Article>,
  ) {}

  private isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }

  async findAll(query: Query): Promise<Article[]> {
    const resPerPage = Number(query.limit) || 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const filter: any = {};

    if (query.search) {
      filter.title = {
        $regex: query.search,
        $options: 'i',
      };
    }

    if (query.author) {
      filter.author = {
        $regex: query.author,
        $options: 'i',
      };
    }

    const sortOption: any = {};
    if (query.sort === 'asc') {
      sortOption.createdAt = 1;
    } else if (query.sort === 'desc') {
      sortOption.createdAt = -1;
    }

    const articles = await this.articleModel
      .find(filter)
      .sort(sortOption)
      .limit(resPerPage)
      .skip(skip);

    return articles;
  }

  async create(article: Article): Promise<Article> {
    const res = await this.articleModel.create(article);
    return res;
  }

  async findById(id: string): Promise<Article> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no tiene un formato válido.`);
    }

    const res = await this.articleModel.findById(id);

    if (!res) {
      throw new NotFoundException(`Artículo con ID ${id} no encontrado`);
    }

    return res;
  }

  async updateById(id: string, article: Article): Promise<Article> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no tiene un formato válido.`);
    }

    const res = await this.articleModel.findByIdAndUpdate(id, article, {
      new: true,
      runValidators: true,
    });

    if (!res) {
      throw new NotFoundException(`Artículo con ID ${id} no encontrado`);
    }

    return res;
  }

  async deleteById(id: string): Promise<Article> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no tiene un formato válido.`);
    }

    const res = await this.articleModel.findByIdAndDelete(id);

    if (!res) {
      throw new NotFoundException(`Artículo con ID ${id} no encontrado`);
    }

    return res;
  }
}
