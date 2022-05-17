import { ImageProps } from 'react-native';

export interface InfoItem {
  title: string;
  image: ImageProps;
}

export interface ReportItem {
  id: number;
  title: string;
  area: string;
  image: string;
  latitude: number;
  longitude: number;
  date: any;
}
