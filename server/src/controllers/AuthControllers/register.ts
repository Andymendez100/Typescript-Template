import { Request, Response } from 'express';

const bcrypt = require('bcrypt');
const User = require('@model/User');

const handleNewUser = async (req: Request, res: Response) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ message: 'Username and password are required.' });

  // Check for duplicates
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // encrypt
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // create and store the new user
    await User.create({
      username: user,
      password: hashedPwd,
    });

    // console.log(result);

    return res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports = { handleNewUser };
