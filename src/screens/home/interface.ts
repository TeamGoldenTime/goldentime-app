import { ImageProps } from 'react-native';
import { UserType } from '../../states/authState';

export interface InfoItem {
  title: string;
  image: ImageProps;
}

export interface IImageProps {
  id: number;
  url: string;
}

export interface ReportItem {
  id: number;
  title: string;
  name: string;
  age: string;
  gender: string;
  area: string;
  remark: string;
  image: string;
  images?: IImageProps[];
  addressName: string;
  latitude: number;
  longitude: number;
  type: string;
  date: any;
  writer?: UserType;
}
