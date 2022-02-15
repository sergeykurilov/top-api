import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface ProductModel extends Base {}

class ProductCharacteristics {
  @prop()
  name: string;
  @prop()
  value: string;
}

export class ProductModel extends TimeStamps {
  @prop()
  _id: number;
  @prop()
  image: string;
  @prop()
  title: string;
  @prop()
  price: number;
  @prop()
  oldPrice: number;
  @prop()
  credit: number;
  @prop()
  calculatedRating: number;
  @prop()
  description: string;
  @prop()
  advantages: string;
  @prop()
  disAdvantages: string;
  @prop({ type: () => [String] })
  categories: string[];
  @prop({ type: () => [String] })
  tags: string;
  @prop({ type: () => [ProductCharacteristics], _id: true })
  characteristics: ProductCharacteristics[];
}
