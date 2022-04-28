import { IImageSrc } from '../../states/formState';

export interface SaveLostPostDto {
  age?: string;
  color?: string;
  date?: Date;
  images?: IImageSrc[];
  kind?: string;
  latitude?: number;
  longitude?: number;
  name?: string;
  remark?: string;
  area?: string;
  userId?: number;
}
