declare module '*.less' {
  const object: {
    [key: string]: string;
  };
  export default object;
}
declare module '*.svg' {
  const filePath: string;
  export default filePath;
}
declare module '*.png' {
  const filePath: string;
  export default filePath;
}