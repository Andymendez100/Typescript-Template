declare global {
  declare module globalThis {
    // eslint-disable-next-line @typescript-eslint/naming-convention, vars-on-top, no-var, no-underscore-dangle
    var __basedir: string;
  }
  namespace Express {
    interface Request {
      user: string;
      file: { path: string; filename: string; originalname: string; };
      
    }
  }
}

export default global;
