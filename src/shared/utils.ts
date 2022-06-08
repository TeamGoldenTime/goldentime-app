import { ReportItem } from '../screens/home/interface';

export const sleep = (ms: number) => {
  return new Promise((r: any) => {
    setTimeout(r, ms);
  });
};

export const petDataToReportItems = (data: any): ReportItem[] => {
  return data?.map((post: any): ReportItem => {
    return petDataToReportItem(post);
  });
};

export const petDataToReportItem = (post: any): ReportItem => {
  return {
    id: post.id,
    title: `강아지/${post.kind}`,
    name: post.name,
    age: post.age,
    gender: post.gender,
    addressName: `${post.region_1depth_name} ${post.region_2depth_name}`,
    area: post.lostPlace,
    remark: post.remark,
    image: post.imgUrl,
    latitude: post.latitude,
    longitude: post.longitude,
    type: post.type,
    date: post.reportDate,
    link: post.detailLink,
  };
};

export const postToLostReportItems = (postData: any): ReportItem[] => {
  return postData.map((post: any): ReportItem => {
    return postToLostReportItem(post);
  });
};

export const postToLostReportItem = (post: any): ReportItem => {
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
    addressName: post.addressName,
    type: post.type,
    writer: post.writer,
    date: post.date,
  };
};

export const postToCatchReportItems = (postData: any): ReportItem[] => {
  return postData.map((post: any): ReportItem => {
    return postToCatchReportItem(post);
  });
};

export const postToCatchReportItem = (post: any): ReportItem => {
  return {
    id: post.id,
    title: `강아지/${post.kind}`,
    name: post.name,
    age: post.age,
    gender: post.gender,
    remark: post.remark,
    area: post.area,
    image: post.images[0]?.location,
    images: post.images,
    latitude: post.latitude,
    longitude: post.longitude,
    addressName: post.addressName,
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

export const kstToDateString = (date: string): string => {
  const monthMap = new Map();
  monthMap.set('Jan', '01');
  monthMap.set('Feb', '02');
  monthMap.set('Mar', '03');
  monthMap.set('Apr', '04');
  monthMap.set('May', '05');
  monthMap.set('Jun', '06');
  monthMap.set('Jul', '07');
  monthMap.set('Aug', '08');
  monthMap.set('Sep', '09');
  monthMap.set('Oct', '10');
  monthMap.set('Nov', '11');
  monthMap.set('Dec', '12');

  const split = date.split(' ');
  return `${split[5]}-${monthMap.get(split[1])}-${split[2]}`;
};
