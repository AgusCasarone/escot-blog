/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article.name)
        private articleModel: mongoose.Model<Article>,
    ) {}

    private isValidObjectId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id);
    }

    async findAll(): Promise<Article[]> {
        const articles = await this.articleModel.find();
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
}
