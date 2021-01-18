export const get = (path: string) => { 
  console.log('post', path);
}

// export const post = (path: string) => { 
//   console.log('post', path);
// }

export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
  const extname = options.extname || '.{js,ts}';
  glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach((item) => require(item));
  return router;
}
