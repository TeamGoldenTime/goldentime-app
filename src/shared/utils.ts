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
      area: post.area,
      image: post.images[0]?.location,
      latitude: post.latitude,
      longitude: post.longitude,
      date: post.date,
    };
  });
};

export const toDateString = (date: any): string => {
  if (date === undefined || date === null) {
    return '';
  }
  return `${date[0]}-${date[1]}-${date[2]}`;
};
