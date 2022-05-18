import { ImageProps } from 'react-native';

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
  latitude: number;
  longitude: number;
  type: string;
  date: any;
}
