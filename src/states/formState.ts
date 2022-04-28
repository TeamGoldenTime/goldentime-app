import { atom } from 'recoil';
import { ImagePickerResponse } from 'react-native-image-picker';

export interface ILocationState {
  latitude: number;
  longitude: number;
}

export interface IImageSrc {
  name: string;
  location: string;
}

export interface IFormState {
  kind: string;
  color: string;
  date: Date;
  name: string;
  age: string;
  gender: string;
  desc: string;
  imagePickerResponse: ImagePickerResponse | null;
  images?: IImageSrc[] | null;
  location: ILocationState | null;
  area: string;
}

export const lostFormState = atom<IFormState>({
  key: 'lostReportForm',
  default: {
    kind: '',
    color: '',
    date: new Date(),
    name: '',
    desc: '',
    age: '',
    gender: '',
    imagePickerResponse: null,
    images: null,
    location: null,
    area: '',
  },
});
