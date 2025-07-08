import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import * as mongoose from 'mongoose';
import { FilterArticleDto } from 'src/common/filters/filter-article.dto';
import { SortOption as SortOptionEnum } from 'src/common/enums/sort-option.enum';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);
  constructor(
    @InjectModel(Article.name)
    private articleModel: mongoose.Model<Article>,
  ) {}

  private isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }

  /**
   * Finds all articles with optional query parameters.
   *
   * @param query a FilterArticleDto object with the following properties:
   * - author: a string to filter the articles by author.
   * - sort: a SortOptionEnum.ASC or SortOptionEnum.DESC string to sort the articles by createdAt date.
   * - currentPage: a number to get the articles from that page.
   * - limit: a number to limit the number of articles per page.
   *
   * @returns a ResponseDto<Article[]> object with the total number of articles and the articles from the specified page.
   * @throws BadRequestException if the query parameters are invalid.
   * @throws NotFoundException if no articles are found.
   */
  async findAll(query: FilterArticleDto): Promise<ResponseDto<Article[]>> {
    this.logger.log('Buscando todos los artículos con query:', query);

    const resPerPage = Number(query.limit) || 10;
    const currentPage = Number(query.currentPage) || 1;
    const skip = resPerPage * (currentPage - 1);

    const aggregationPipeline: any[] = [];

    if (query.author) {
      aggregationPipeline.push({
        $match: { author: query.author },
      });
    }

    if (query.sort) {
      aggregationPipeline.push({
        $sort: { createdAt: query.sort === SortOptionEnum.ASC ? 1 : -1 },
      });
    }

    aggregationPipeline.push({
      $skip: skip,
    });
    aggregationPipeline.push({
      $limit: resPerPage,
    });

    this.logger.log(
      `Pipeline de agregación: ${JSON.stringify(aggregationPipeline)}`,
    );

    const articles: Article[] = (await this.articleModel
      .aggregate(aggregationPipeline)
      .exec()) as Article[];

    this.logger.log(`Artículos encontrados: ${articles.length}`);

    return { total: articles.length, data: articles };
  }

  /**
   * Creates a new article in the database.
   *
   * @param article - The article object to be created.
   * @returns A promise that resolves to the created article.
   * @throws BadRequestException if there is an error during creation.
   */
  async create(article: CreateArticleDto): Promise<Article> {
    try {
      return await this.articleModel.create(article);
    } catch (error) {
      this.logger.error(`Error al crear artículo: ${error}`);
      throw new BadRequestException(`Error al crear artículo: ${error}`);
    }
  }

  /**
   * Finds an article by ID.
   *
   * @param id - The ID of the article to find.
   * @returns A promise that resolves to the found article.
   * @throws BadRequestException if the ID is invalid.
   * @throws NotFoundException if no article is found.
   */
  async findById(id: string): Promise<Article> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no tiene un formato válido.`);
    }

    try {
      return (await this.articleModel.findById(id).exec()) as Article;
    } catch (error) {
      this.logger.error(`Error al buscar artículo con ID ${id}: ${error}`);
      throw new BadRequestException(
        `Error al buscar artículo con ID ${id}: ${error}`,
      );
    }
  }

  /**
   * Updates an article by ID.
   *
   * @param id - The ID of the article to update.
   * @param article - The updated article object.
   * @returns A promise that resolves to the updated article.
   * @throws BadRequestException if the ID is invalid.
   * @throws NotFoundException if no article is found.
   */
  async updateById(id: string, article: UpdateArticleDto): Promise<Article> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no tiene un formato válido.`);
    }

    let res: UpdateArticleDto | null;

    try {
      res = await this.articleModel.findByIdAndUpdate(id, article, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      this.logger.error(`Error al actualizar artículo con ID ${id}: ${error}`);
      throw new BadRequestException(
        `Error al actualizar artículo con ID ${id}: ${error}`,
      );
    }

    if (!res) {
      throw new NotFoundException(`Artículo con ID ${id} no encontrado`);
    }

    return res;
  }

  /**
   * Deletes an article by ID.
   *
   * @param id - The ID of the article to delete.
   * @returns A promise that resolves to the deleted article.
   * @throws BadRequestException if the ID is invalid.
   * @throws NotFoundException if no article is found.
   */

  async deleteById(id: string): Promise<Article> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no tiene un formato válido.`);
    }

    let res: Article | null;

    try {
      res = await this.articleModel.findByIdAndDelete(id);

      if (!res) {
        throw new NotFoundException(`Artículo con ID ${id} no encontrado`);
      }
    } catch (error) {
      this.logger.error(`Error al eliminar artículo con ID ${id}: ${error}`);
      throw new BadRequestException(
        `Error al eliminar artículo con ID ${id}: ${error}`,
      );
    }

    return res;
  }
}
