import { ImageProps } from 'react-native';

export interface InfoItem {
  title: string;
  image: ImageProps;
}

export interface ReportItem {
  id: number;
  title: string;
  location: string;
  image: string;
  latitude: number;
  longitude: number;
}
