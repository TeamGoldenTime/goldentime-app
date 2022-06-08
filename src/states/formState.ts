import { atom } from 'recoil';
import { Asset, ImagePickerResponse } from 'react-native-image-picker';

export interface ILocationState {
  latitude: number;
  longitude: number;
}

export interface IImageSrc {
  name: string;
  location: string;
}

export interface ILostFormState {
  kind: string;
  color: string;
  date: Date;
  name: string;
  age: string;
  gender: string;
  desc: string;
  pickerImages: Asset[];
  images?: IImageSrc[] | null;
  location: ILocationState | null;
  area: string;
}

export const lostFormState = atom<ILostFormState>({
  key: 'lostReportForm',
  default: {
    kind: '',
    color: '',
    date: new Date(),
    name: '',
    desc: '',
    age: '',
    gender: '',
    pickerImages: [],
    images: null,
    location: null,
    area: '',
  },
});

export interface ICatchFormState {
  kind: string;
  date: Date;
  desc: string;
  pickerImages: Asset[];
  images?: IImageSrc[] | null;
  location: ILocationState | null;
  area: string;
}

export const catchFormState = atom<ICatchFormState>({
  key: 'catchReportForm',
  default: {
    kind: '',
    date: new Date(),
    desc: '',
    pickerImages: [],
    images: null,
    location: null,
    area: '',
  },
});
