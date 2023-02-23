import { Request, Response } from 'express';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('@model/User');

const handleLogin = async (req: Request, res: Response) => {
  const { cookies } = req;
  // console.log(`cookie: ${JSON.stringify(cookies)}`);
  const { user, pwd }: { user: string; pwd: string } = req.body;
  if (!user || !pwd) return res.status(400).json({ message: 'Username and password are required.' });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); // Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const jwtData = {
      UserInfo: {
        username: foundUser.username,
      },
    };
    // create JWTs
    const accessToken = jwt.sign(jwtData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
    const newRefreshToken = jwt.sign(jwtData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt: string) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      // Detected refresh token reuse
      if (!foundToken) {
        console.log('attempted refresh token reuse at login!');
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
    }

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

    // Send authorization roles and access token to user
    return res.json({ accessToken });
  }
  return res.sendStatus(401);
};

module.exports = { handleLogin };
