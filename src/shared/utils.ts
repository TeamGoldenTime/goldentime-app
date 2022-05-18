import { ReportItem } from '../screens/home/interface';

export const sleep = (ms: number) => {
  return new Promise((r: any) => {
    setTimeout(r, ms);
  });
};

export const postToReportItems = (postData: any): ReportItem[] => {
  return postData.map((post: any): ReportItem => {
    return {
      id: post.id,
      title: `강아지/${post.kind}/${post.color}`,
      name: post.name,
      age: post.age,
      gender: post.gender,
      area: post.area,
      remark: post.remark,
      image: post.images[0]?.location,
      latitude: post.latitude,
      longitude: post.longitude,
      type: post.type,
      date: post.date,
    };
  });
};

export const postToReportItem = (post: any): ReportItem => {
  return {
    id: post.id,
    title: `강아지/${post.kind}/${post.color}`,
    name: post.name,
    age: post.age,
    gender: post.gender,
    remark: post.remark,
    area: post.area,
    image: post.images[0]?.location,
    images: post.images,
    latitude: post.latitude,
    longitude: post.longitude,
    type: post.type,
    writer: post.writer,
    date: post.date,
  };
};

export const toDateString = (date: any): string => {
  if (date === undefined || date === null) {
    return '';
  }
  return `${date[0]}-${date[1]}-${date[2]}`;
};
