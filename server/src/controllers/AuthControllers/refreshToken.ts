import { DecodedToken } from '@root/types/jwtToken/jwtToken';
import { Request, Response } from 'express';

const jwt = require('jsonwebtoken');
const User = require('@model/User');

const handleRefreshToken = async (req: Request, res: Response) => {
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

  const foundUser = await User.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as DecodedToken;
      console.log('attempted refresh token reuse!');
      const hackedUser = await User.findOne({
        username: decoded.UserInfo.username,
      }).exec();
      hackedUser.refreshToken = [];
      await hackedUser.save();
      return res.sendStatus(403);
    } catch (error) {
      return res.sendStatus(403);
    }
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter((rt: string) => rt !== refreshToken);

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as DecodedToken;
    if (foundUser.username !== decoded.UserInfo.username) return res.sendStatus(403);

    const jwtData = {
      UserInfo: {
        username: foundUser.username,
      },
    };

    // Refresh token was still valid
    const accessToken = jwt.sign(jwtData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });

    const newRefreshToken = jwt.sign(jwtData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } catch (error) {
    console.error('expired refresh token', error);
    foundUser.refreshToken = [...newRefreshTokenArray];
    await foundUser.save();
    return res.sendStatus(403);
  }
};

module.exports = { handleRefreshToken };
