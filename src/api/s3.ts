import { File, Options, RNS3 } from 'react-native-aws3';
import {
  S3_SECRET_KEY,
  S3_ACCESS_KEY,
  S3_REGION,
  S3_BUCKET,
} from 'react-native-dotenv';

const options: Options = {
  bucket: S3_BUCKET,
  region: S3_REGION,
  accessKey: S3_ACCESS_KEY,
  secretKey: S3_SECRET_KEY,
  successActionStatus: 201,
};

export const uploadImageToS3 = async (image: any) => {
  const file: File = {
    uri: image.uri,
    name: image.fileName,
    type: image.type,
  };

  return new Promise((resolve, reject) => {
    RNS3.put(file, options)
      .then((response: any) => {
        if (response.status !== 201) {
          console.log('error', response);
          return;
        }

        const { postResponse } = response?.body;
        resolve({
          name: postResponse.key,
          location: postResponse.location,
        });
      })
      .catch(error => {
        console.error('error', error);
        reject(error);
      });
  });
};
