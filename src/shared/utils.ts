export const sleep = (ms: number) => {
  return new Promise((r: any) => {
    setTimeout(r, ms);
  });
};
