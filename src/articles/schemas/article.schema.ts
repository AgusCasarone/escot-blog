import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Article {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  author: string;

  @Prop()
  image: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
