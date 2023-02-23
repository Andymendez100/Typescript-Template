export declare global {
  declare module globalThis {
    var __basedir: string;
  }
  namespace Express {
    interface Request {
      user: { UserInfo: { username: string } };
    }
  }
}
