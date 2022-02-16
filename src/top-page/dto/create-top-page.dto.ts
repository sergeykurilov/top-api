import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TopLevelCategory } from '../top-page.model';
import { Type } from 'class-transformer';

export class HHDataDto {
  @IsNumber()
  count: number;
  @IsNumber()
  juniorSalary: number;
  @IsNumber()
  middleSalary: number;
  @IsNumber()
  seniorSalary: number;
}

export class TopPageAdvantagesDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
}

export interface CreateTopPageDto extends Base {}
export class CreateTopPageDto extends TimeStamps {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
  @IsString()
  secondCategory: string;
  @IsString()
  alias: string;
  @IsString()
  title: string;
  @IsString()
  category: string;
  @IsOptional()
  @Type(() => HHDataDto)
  hh?: HHDataDto;
  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantagesDto)
  advantages: TopPageAdvantagesDto[];
  @IsString()
  seoText: string;
  @IsString()
  tagsTitle: string;
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
