import { Request, Response } from 'express';

const User = require('@model/User');

const handleLogout = async (req: Request, res: Response) => {
  // On client, also delete the accessToken

  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Check refreshToken in db
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter((rt: string) => rt !== refreshToken);
  await foundUser.save();

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  return res.sendStatus(204);
};

module.exports = { handleLogout };
